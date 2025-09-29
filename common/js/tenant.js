// Tenant Module for APTI Property Management System using Firebase Firestore

// All tenant data is now stored in Firebase Firestore
// No mock data needed

// Initialize tenant data
function initializeTenantData() {
    try {
        const currentUser = APTI_Auth.getCurrentUser('tenant');
        if (!currentUser) return;
        
        const tenantDataKey = `apti_tenant_data_${currentUser.id}`;
        if (!APTI_Utils.storage.get(tenantDataKey)) {
            APTI_Utils.storage.set(tenantDataKey, TENANT_MOCK_DATA);
        }
    } catch (error) {
        console.error('Error initializing tenant data:', error);
    }
}

// Get tenant data from Firestore
async function getTenantData(type) {
    try {
        const currentUser = window.auth.currentUser;
        if (!currentUser) return [];

        const colRef = window.db.collection('tenants').doc(currentUser.uid).collection(type);
        const snapshot = await colRef.get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error('Error getting tenant data:', error);
        return [];
    }
}

// Save tenant data to Firestore
async function saveTenantData(type, data) {
    try {
        const currentUser = window.auth.currentUser;
        if (!currentUser) return false;

        const colRef = window.db.collection('tenants').doc(currentUser.uid).collection(type);
        await colRef.doc(data.id).set(data);
        return true;
    } catch (error) {
        console.error('Error saving tenant data:', error);
        return false;
    }
}

// Bills Management
const TenantBillsManager = {
    // Get all bills for current tenant
    async getAll(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            let bills = await getTenantData('bills');

            // Apply filters
            if (filters.status) {
                bills = bills.filter(b => b.status === filters.status);
            }
            if (filters.type) {
                bills = bills.filter(b => b.type === filters.type);
            }
            if (filters.month && filters.year) {
                bills = bills.filter(b => {
                    const billDate = new Date(b.createdAt);
                    return billDate.getMonth() === parseInt(filters.month) - 1 &&
                           billDate.getFullYear() === parseInt(filters.year);
                });
            }

            return { success: true, data: bills };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Download bill
    async download(billId) {
        try {
            await APTI_Utils.simulateApiDelay();

            const bills = await getTenantData('bills');
            const bill = bills.find(b => b.id === billId);

            if (!bill) {
                throw new Error('Bill not found');
            }

            // Simulate PDF generation and download
            const pdfContent = `
                APTI Property Management
                Bill Number: ${bill.billNumber}
                Type: ${APTI_Utils.capitalizeWords(bill.type)}
                Amount: ${APTI_Utils.formatCurrency(bill.amount)}
                Due Date: ${APTI_Utils.formatDate(bill.dueDate)}
                Status: ${APTI_Utils.capitalizeWords(bill.status)}
                Description: ${bill.description}
            `;

            const blob = new Blob([pdfContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${bill.billNumber}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            return {
                success: true,
                message: 'Bill downloaded successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Payments Management
const TenantPaymentsManager = {
    // Get payment history
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            return {
                success: true,
                data: await getTenantData('payments')
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Process payment
        async processPayment(paymentData) {
            try {
                // If payment method is credit_card, use PayMongo integration
                if (paymentData.method === 'credit_card') {
                    // Validate card details
                    if (!paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCvv) {
                        throw new Error('Card details are required for credit card payments');
                    }
                    // Parse expiry month and year
                    const [expMonth, expYear] = paymentData.cardExpiry.split('/');
                    if (!expMonth || !expYear) {
                        throw new Error('Invalid expiry date format. Use MM/YY');
                    }
                    // Create payment intent
                    const paymentIntent = await PayMongo.createPaymentIntent(paymentData.amount, 'PHP', `Payment for bill ${paymentData.billId}`);
                    // Create payment method
                    const paymentMethod = await PayMongo.createPaymentMethod({
                        card_number: paymentData.cardNumber.replace(/\s+/g, ''),
                        exp_month: parseInt(expMonth),
                        exp_year: 2000 + parseInt(expYear),
                        cvc: paymentData.cardCvv
                    });
                    // Attach payment method to payment intent
                    const attachResult = await PayMongo.attachPaymentMethod(paymentIntent.data.id, paymentMethod.data.id);
                    if (attachResult.data.attributes.status !== 'succeeded') {
                        throw new Error('Payment failed or requires additional authentication');
                    }
                    // Update bill and payment records locally
                    const bills = await getTenantData('bills');
                    const billIndex = bills.findIndex(b => b.id === paymentData.billId);
                    if (billIndex === -1) {
                        throw new Error('Bill not found');
                    }
                    bills[billIndex].status = 'paid';
                    bills[billIndex].paidAt = new Date();
                    await saveTenantData('bills', bills[billIndex]);
                    const payments = await getTenantData('payments');
                    const newPayment = {
                        id: APTI_Utils.generateId(),
                        billId: paymentData.billId,
                        amount: parseFloat(paymentData.amount),
                        method: 'credit_card',
                        status: 'completed',
                        receiptNumber: `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
                        cardLast4: paymentData.cardNumber.slice(-4),
                        paidAt: new Date(),
                        createdAt: new Date()
                    };
                    await saveTenantData('payments', newPayment);
                    return {
                        success: true,
                        message: 'Payment processed successfully',
                        data: newPayment
                    };
                } else if (paymentData.method === 'gcash') {
                    // Validate GCash number
                    if (!paymentData.gcashNumber) {
                        throw new Error('GCash number is required for GCash payments');
                    }
                    // Simulate GCash payment processing
                    await APTI_Utils.simulateApiDelay(2000, 3000);
                    // Update bill and payment records locally
                    const bills = await getTenantData('bills');
                    const billIndex = bills.findIndex(b => b.id === paymentData.billId);
                    if (billIndex === -1) {
                        throw new Error('Bill not found');
                    }
                    bills[billIndex].status = 'paid';
                    bills[billIndex].paidAt = new Date();
                    await saveTenantData('bills', bills[billIndex]);
                    const payments = await getTenantData('payments');
                    const newPayment = {
                        id: APTI_Utils.generateId(),
                        billId: paymentData.billId,
                        amount: parseFloat(paymentData.amount),
                        method: 'gcash',
                        status: 'completed',
                        receiptNumber: `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
                        gcashNumber: paymentData.gcashNumber,
                        paidAt: new Date(),
                        createdAt: new Date()
                    };
                    await saveTenantData('payments', newPayment);
                    return {
                        success: true,
                        message: 'Payment processed successfully',
                        data: newPayment
                    };
                } else {
                    // Fallback to existing simulated payment processing for other methods
                    await APTI_Utils.simulateApiDelay(2000, 3000);
                    const bills = await getTenantData('bills');
                    const billIndex = bills.findIndex(b => b.id === paymentData.billId);
                    if (billIndex === -1) {
                        throw new Error('Bill not found');
                    }
                    bills[billIndex].status = 'paid';
                    bills[billIndex].paidAt = new Date();
                    await saveTenantData('bills', bills[billIndex]);
                    const payments = await getTenantData('payments');
                    const newPayment = {
                        id: APTI_Utils.generateId(),
                        billId: paymentData.billId,
                        amount: parseFloat(paymentData.amount),
                        method: paymentData.method,
                        status: 'completed',
                        receiptNumber: `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(3, '0')}`,
                        paidAt: new Date(),
                        createdAt: new Date()
                    };
                    await saveTenantData('payments', newPayment);
                    return {
                        success: true,
                        message: 'Payment processed successfully',
                        data: newPayment
                    };
                }
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

    // Generate receipt
    async generateReceipt(paymentId) {
        try {
            await APTI_Utils.simulateApiDelay();

            const payments = await getTenantData('payments');
            const payment = payments.find(p => p.id === paymentId);

            if (!payment) {
                throw new Error('Payment not found');
            }
            
            const currentUser = APTI_Auth.getCurrentUser('tenant');
            
            // Generate receipt content
            let paymentMethodText = '';
            if (payment.method === 'credit_card') {
                paymentMethodText = `Credit Card ending in ${payment.cardLast4}`;
            } else if (payment.method === 'gcash') {
                paymentMethodText = `GCash (${payment.gcashNumber})`;
            } else {
                paymentMethodText = APTI_Utils.capitalizeWords(payment.method);
            }

            const receiptContent = `
                APTI Property Management - Payment Receipt

                Receipt Number: ${payment.receiptNumber}
                Date: ${APTI_Utils.formatDate(payment.paidAt)}

                Tenant: ${currentUser.name}
                Unit: ${currentUser.unitNumber}

                Amount Paid: ${APTI_Utils.formatCurrency(payment.amount)}
                Payment Method: ${paymentMethodText}
                Status: ${APTI_Utils.capitalizeWords(payment.status)}

                Thank you for your payment!
            `;
            
            const blob = new Blob([receiptContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `Receipt_${payment.receiptNumber}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return {
                success: true,
                message: 'Receipt downloaded successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Maintenance Management
const TenantMaintenanceManager = {
    // Get all maintenance requests
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            return {
                success: true,
                data: await getTenantData('maintenance')
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Submit new maintenance request
    async submit(requestData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const validation = APTI_Utils.validateForm(requestData, {
                issue: { required: true, label: 'Issue Title' },
                description: { required: true, label: 'Description', minLength: 10 },
                priority: { required: true, label: 'Priority' }
            });

            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }

            const maintenance = await getTenantData('maintenance');

            const newRequest = {
                id: APTI_Utils.generateId(),
                issue: requestData.issue,
                description: requestData.description,
                priority: requestData.priority,
                status: 'pending',
                images: requestData.images || [],
                createdAt: new Date(),
                updatedAt: new Date(),
                adminResponse: null
            };

            await saveTenantData('maintenance', newRequest);

            return {
                success: true,
                message: 'Maintenance request submitted successfully',
                data: newRequest
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Documents Management
const TenantDocumentsManager = {
    // Get all documents
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            return {
                success: true,
                data: await getTenantData('documents')
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Upload document
    async upload(file, documentType, documentName) {
        try {
            await APTI_Utils.simulateApiDelay();

            // Validate file
            const validation = APTI_Utils.validateFile(file, {
                maxSize: 10 * 1024 * 1024, // 10MB
                allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            });

            if (!validation.isValid) {
                throw new Error(validation.errors[0]);
            }

            const documents = await getTenantData('documents');

            const newDocument = {
                id: APTI_Utils.generateId(),
                name: documentName || file.name,
                type: documentType,
                fileName: file.name,
                size: file.size,
                uploadedAt: new Date(),
                url: URL.createObjectURL(file) // In real app, this would be server URL
            };

            await saveTenantData('documents', newDocument);

            return {
                success: true,
                message: 'Document uploaded successfully',
                data: newDocument
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Download document
    async download(documentId) {
        try {
            await APTI_Utils.simulateApiDelay();

            const documents = await getTenantData('documents');
            const document = documents.find(d => d.id === documentId);

            if (!document) {
                throw new Error('Document not found');
            }

            // Simulate download
            if (document.url) {
                const a = document.createElement('a');
                a.href = document.url;
                a.download = document.fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

            return {
                success: true,
                message: 'Document download started'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete document
    async delete(documentId) {
        try {
            await APTI_Utils.simulateApiDelay();

            const documents = await getTenantData('documents');
            const documentIndex = documents.findIndex(d => d.id === documentId);

            if (documentIndex === -1) {
                throw new Error('Document not found');
            }

            documents.splice(documentIndex, 1);
            await saveTenantData('documents', documents);

            return {
                success: true,
                message: 'Document deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Announcements Management
const TenantAnnouncementsManager = {
    // Get all announcements from admin data
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();

            // Get announcements from admin data
            const adminData = APTI_Utils.storage.get('apti_admin_data') || {};
            const adminAnnouncements = adminData.announcements || [];

            // Get tenant's read status
            const tenantReadData = await getTenantData('announcementReadStatus') || {};

            // Merge admin announcements with tenant read status
            const announcements = adminAnnouncements
                .filter(a => a.status === 'published') // Only show published announcements
                .map(a => ({
                    ...a,
                    isRead: tenantReadData[a.id] || false
                }))
                .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); // Newest first

            return {
                success: true,
                data: announcements
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Mark announcement as read
    async markAsRead(announcementId) {
        try {
            await APTI_Utils.simulateApiDelay();

            // Update tenant's read status
            const tenantReadData = await getTenantData('announcementReadStatus') || {};
            tenantReadData[announcementId] = true;
            await saveTenantData('announcementReadStatus', tenantReadData);

            return {
                success: true,
                message: 'Announcement marked as read'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Communication Manager
const TenantCommunicationManager = {
    // Send message to admin
    async sendMessage(messageData) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const validation = APTI_Utils.validateForm(messageData, {
                subject: { required: true, label: 'Subject' },
                message: { required: true, label: 'Message', minLength: 10 }
            });
            
            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }
            
            // Simulate sending message
            console.log('Message sent to admin:', messageData);
            
            return {
                success: true,
                message: 'Message sent successfully to property management'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Dashboard Statistics
const TenantDashboard = {
    async getStats() {
        try {
            await APTI_Utils.simulateApiDelay();

            const bills = await getTenantData('bills');
            const payments = await getTenantData('payments');
            const maintenance = await getTenantData('maintenance');

            // Get announcements from admin data for stats
            const adminData = APTI_Utils.storage.get('apti_admin_data') || {};
            const adminAnnouncements = adminData.announcements || [];
            const tenantReadData = await getTenantData('announcementReadStatus') || {};

            const publishedAnnouncements = adminAnnouncements.filter(a => a.status === 'published');
            const unreadAnnouncements = publishedAnnouncements.filter(a => !tenantReadData[a.id]).length;

            const stats = {
                unpaidBills: bills.filter(b => b.status === 'pending' || b.status === 'overdue').length,
                totalPaid: payments.reduce((sum, p) => sum + p.amount, 0),
                activeMaintenance: maintenance.filter(m => m.status === 'pending' || m.status === 'in-progress').length,
                unreadAnnouncements: unreadAnnouncements,
                nextBillDue: bills
                    .filter(b => b.status === 'pending' || b.status === 'overdue')
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]
            };

            return {
                success: true,
                data: stats
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Initialize tenant module
function initTenant() {
    initializeTenantData();
}

// Export tenant functions
window.APTI_Tenant = {
    TenantBillsManager,
    TenantPaymentsManager,
    TenantMaintenanceManager,
    TenantDocumentsManager,
    TenantAnnouncementsManager,
    TenantCommunicationManager,
    TenantDashboard,
    getTenantData,
    saveTenantData,
    initTenant
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTenant);

// ===== Terms Modal Functions =====
function showTermsModal() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "flex";
}

function acceptTerms() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "none";
    alert("You accepted the terms ✅");
    // Optional: enable signup form here
    const signupBtn = document.querySelector("#signupForm button[type='submit']");
    if (signupBtn) signupBtn.disabled = false;
}

function closeTermsModal() {
    const modal = document.getElementById("termsModal");
    if (modal) modal.style.display = "none";
}
