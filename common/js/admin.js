// Admin Module for APTI Property Management System

// Mock data for admin operations
const MOCK_DATA = {
    units: [
        {
            id: 'unit1',
            unitNumber: 'A101',
            type: '1 Bedroom',
            rent: 1200,
            status: 'occupied',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            images: [],
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 'unit2',
            unitNumber: 'A102',
            type: '2 Bedroom',
            rent: 1500,
            status: 'vacant',
            tenantId: null,
            tenantName: null,
            images: [],
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 'unit3',
            unitNumber: 'B201',
            type: '1 Bedroom',
            rent: 1250,
            status: 'maintenance',
            tenantId: null,
            tenantName: null,
            images: [],
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        }
    ],
    bills: [
        {
            id: 'bill1',
            billNumber: 'BILL-2024-001',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            type: 'rent',
            amount: 1200,
            dueDate: new Date('2024-12-31'),
            status: 'pending',
            createdAt: new Date('2024-12-01'),
            paidAt: null
        },
        {
            id: 'bill2',
            billNumber: 'BILL-2024-002',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            type: 'water',
            amount: 85,
            dueDate: new Date('2024-12-15'),
            status: 'overdue',
            createdAt: new Date('2024-11-15'),
            paidAt: null
        }
    ],
    payments: [
        {
            id: 'payment1',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            amount: 1200,
            method: 'credit_card',
            status: 'completed',
            reference: 'REF-001',
            date: new Date('2024-11-01'),
            createdAt: new Date('2024-11-01')
        },
        {
            id: 'payment2',
            tenantId: 'tenant2',
            tenantName: 'Jane Smith',
            unitNumber: 'A102',
            amount: 1500,
            method: 'bank_transfer',
            status: 'pending',
            reference: 'REF-002',
            date: new Date('2024-12-15'),
            createdAt: new Date('2024-12-15')
        },
        {
            id: 'payment3',
            tenantId: 'tenant3',
            tenantName: 'Bob Johnson',
            unitNumber: 'B201',
            amount: 1250,
            method: 'cash',
            status: 'completed',
            reference: 'REF-003',
            date: new Date('2024-12-01'),
            createdAt: new Date('2024-12-01')
        }
    ],
    maintenance: [
        {
            id: 'maintenance1',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            issue: 'Leaky faucet in kitchen',
            description: 'The kitchen faucet has been dripping constantly for the past week.',
            status: 'pending',
            priority: 'medium',
            images: [],
            createdAt: new Date('2024-12-10'),
            updatedAt: new Date('2024-12-10'),
            completedAt: null
        },
        {
            id: 'maintenance2',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            issue: 'Broken light fixture',
            description: 'Light fixture in bedroom is not working.',
            status: 'in-progress',
            priority: 'low',
            images: [],
            createdAt: new Date('2024-12-08'),
            updatedAt: new Date('2024-12-09'),
            completedAt: null
        }
    ],
    announcements: [
        {
            id: 'announcement1',
            title: 'Building Maintenance Schedule',
            content: 'The building elevator will be under maintenance on Saturday, December 16th from 9 AM to 3 PM. Please use the stairs during this time.',
            status: 'published',
            category: 'maintenance',
            importance: 'high',
            author: 'Property Manager',
            publishedAt: new Date('2024-12-12'),
            expiresAt: new Date('2024-12-17'),
            attachments: [],
            createdAt: new Date('2024-12-12'),
            updatedAt: new Date('2024-12-12')
        },
        {
            id: 'announcement2',
            title: 'Holiday Office Hours',
            content: 'Our office will have modified hours during the holiday season. Please check the updated schedule on our website.',
            status: 'published',
            category: 'general',
            importance: 'medium',
            author: 'Property Manager',
            publishedAt: new Date('2024-12-05'),
            expiresAt: null,
            attachments: [],
            createdAt: new Date('2024-12-05'),
            updatedAt: new Date('2024-12-05')
        },
        {
            id: 'announcement3',
            title: 'Rent Payment Reminder',
            content: 'This is a reminder that rent payments are due on the 1st of each month. Late fees will apply after the 5th.',
            status: 'draft',
            category: 'billing',
            importance: 'medium',
            author: 'Property Manager',
            publishedAt: null,
            expiresAt: null,
            attachments: [],
            createdAt: new Date('2024-12-10'),
            updatedAt: new Date('2024-12-10')
        }
    ],
    leaseDocuments: [
        {
            id: 'lease1',
            tenantId: 'tenant1',
            tenantName: 'John Doe',
            unitNumber: 'A101',
            documentName: 'Lease Agreement - John Doe',
            fileName: 'lease_john_doe.pdf',
            fileType: 'application/pdf',
            fileSize: 245760,
            status: 'active',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            uploadedAt: new Date('2024-01-01'),
            notes: 'Standard 12-month lease agreement',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
        },
        {
            id: 'lease2',
            tenantId: 'tenant2',
            tenantName: 'Alice Smith',
            unitNumber: 'A102',
            documentName: 'Lease Agreement - Alice Smith',
            fileName: 'lease_alice_smith.pdf',
            fileType: 'application/pdf',
            fileSize: 286720,
            status: 'pending',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2025-01-31'),
            uploadedAt: new Date('2024-02-01'),
            notes: 'Includes pet addendum',
            createdAt: new Date('2024-02-01'),
            updatedAt: new Date('2024-02-01')
        }
    ]
};

// Initialize admin data
async function initializeAdminData() {
    try {
        const currentUser = window.auth.currentUser;
        if (!currentUser) return;

        // Optionally, initialize any admin-specific data here if needed
        // For now, no initialization needed
    } catch (error) {
        console.error('Error initializing admin data:', error);
    }
}

// Get admin data from Firestore
async function getAdminData(type) {
    try {
        const currentUser = window.auth.currentUser;
        if (!currentUser) return [];

        const colRef = window.db.collection('admin').doc('data').collection(type);
        const snapshot = await colRef.get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error('Error getting admin data:', error);
        return [];
    }
}

// Save admin data to Firestore
async function saveAdminData(type, data) {
    try {
        const currentUser = window.auth.currentUser;
        if (!currentUser) return false;

        const colRef = window.db.collection('admin').doc('data').collection(type);

        if (Array.isArray(data)) {
            // Save multiple documents
            const batch = window.db.batch();
            data.forEach(item => {
                const docRef = colRef.doc(item.id);
                batch.set(docRef, item);
            });
            await batch.commit();
        } else {
            // Save single document
            await colRef.doc(data.id).set(data);
        }
        return true;
    } catch (error) {
        console.error('Error saving admin data:', error);
        return false;
    }
}

// Units Management
const UnitsManager = {
    // Get all units
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            const units = await getAdminData('units');
            return {
                success: true,
                data: units
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get unit by ID
    async getById(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            const units = await getAdminData('units');
            const unit = units.find(u => u.id === id);

            if (!unit) {
                throw new Error('Unit not found');
            }

            return { success: true, data: unit };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create new unit
    async create(unitData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const validation = APTI_Utils.validateForm(unitData, {
                unitNumber: { required: true, label: 'Unit Number' },
                type: { required: true, label: 'Unit Type' },
                rent: { required: true, label: 'Rent Amount' }
            });

            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }

            const units = await getAdminData('units');

            // Check if unit number already exists
            if (units.find(u => u.unitNumber === unitData.unitNumber)) {
                throw new Error('Unit number already exists');
            }

            const newUnit = {
                id: APTI_Utils.generateId(),
                unitNumber: unitData.unitNumber,
                type: unitData.type,
                rent: parseFloat(unitData.rent),
                status: 'vacant',
                tenantId: null,
                tenantName: null,
                images: unitData.images || [],
                createdAt: new Date(),
                updatedAt: new Date()
            };

            units.push(newUnit);
            await saveAdminData('units', units);

            return {
                success: true,
                message: 'Unit created successfully',
                data: newUnit
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update unit
    async update(id, unitData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const units = await getAdminData('units');
            const unitIndex = units.findIndex(u => u.id === id);

            if (unitIndex === -1) {
                throw new Error('Unit not found');
            }

            units[unitIndex] = {
                ...units[unitIndex],
                ...unitData,
                updatedAt: new Date()
            };

            await saveAdminData('units', units);

            return {
                success: true,
                message: 'Unit updated successfully',
                data: units[unitIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete unit
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();

            const units = await getAdminData('units');
            const unitIndex = units.findIndex(u => u.id === id);

            if (unitIndex === -1) {
                throw new Error('Unit not found');
            }

            // Check if unit is occupied
            if (units[unitIndex].status === 'occupied') {
                throw new Error('Cannot delete occupied unit');
            }

            units.splice(unitIndex, 1);
            await saveAdminData('units', units);

            return {
                success: true,
                message: 'Unit deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Bills Management
const BillsManager = {
    // Get all bills
    async getAll(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            let bills = await getAdminData('bills');

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

    // Create new bill
    async create(billData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const validation = APTI_Utils.validateForm(billData, {
                tenantId: { required: true, label: 'Tenant' },
                type: { required: true, label: 'Bill Type' },
                amount: { required: true, label: 'Amount' },
                dueDate: { required: true, label: 'Due Date' }
            });

            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }

            const bills = await getAdminData('bills');
            const billNumber = `BILL-${new Date().getFullYear()}-${String(bills.length + 1).padStart(3, '0')}`;

            const newBill = {
                id: APTI_Utils.generateId(),
                billNumber: billNumber,
                tenantId: billData.tenantId,
                tenantName: billData.tenantName,
                unitNumber: billData.unitNumber,
                type: billData.type,
                amount: parseFloat(billData.amount),
                dueDate: new Date(billData.dueDate),
                status: 'pending',
                createdAt: new Date(),
                paidAt: null
            };

            bills.push(newBill);
            await saveAdminData('bills', bills);

            return {
                success: true,
                message: 'Bill created successfully',
                data: newBill
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update bill
    async update(id, billData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const bills = await getAdminData('bills');
            const billIndex = bills.findIndex(b => b.id === id);

            if (billIndex === -1) {
                throw new Error('Bill not found');
            }

            bills[billIndex] = {
                ...bills[billIndex],
                ...billData,
                updatedAt: new Date()
            };

            await saveAdminData('bills', bills);

            return {
                success: true,
                message: 'Bill updated successfully',
                data: bills[billIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete bill
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();

            const bills = await getAdminData('bills');
            const billIndex = bills.findIndex(b => b.id === id);

            if (billIndex === -1) {
                throw new Error('Bill not found');
            }

            bills.splice(billIndex, 1);
            await saveAdminData('bills', bills);

            return {
                success: true,
                message: 'Bill deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Payments Management
const PaymentsManager = {
    // Get all payments
    async getAll(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            let payments = await getAdminData('payments');

            // Apply filters
            if (filters.status) {
                payments = payments.filter(p => p.status === filters.status);
            }
            if (filters.method) {
                payments = payments.filter(p => p.method === filters.method);
            }
            if (filters.tenantId) {
                payments = payments.filter(p => p.tenantId === filters.tenantId);
            }
            if (filters.month && filters.year) {
                payments = payments.filter(p => {
                    const paymentDate = new Date(p.date);
                    return paymentDate.getMonth() === parseInt(filters.month) - 1 &&
                           paymentDate.getFullYear() === parseInt(filters.year);
                });
            }

            return { success: true, data: payments };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create new payment
    async create(paymentData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const validation = APTI_Utils.validateForm(paymentData, {
                tenantId: { required: true, label: 'Tenant' },
                amount: { required: true, label: 'Amount' },
                method: { required: true, label: 'Payment Method' },
                reference: { required: true, label: 'Reference Number' }
            });

            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }

            // If payment method is credit_card, process via PayMongo API
            if (paymentData.method === 'credit_card') {
                // Validate card fields
                if (!paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCvv) {
                    throw new Error('Credit card details are required for credit card payments.');
                }

                // Parse expiry MM/YY
                const [expMonthStr, expYearStr] = paymentData.cardExpiry.split('/');
                if (!expMonthStr || !expYearStr) {
                    throw new Error('Invalid card expiry date format. Use MM/YY.');
                }
                const expMonth = parseInt(expMonthStr.trim());
                let expYear = parseInt(expYearStr.trim());
                if (expYear < 100) {
                    expYear += 2000; // convert YY to YYYY
                }

                // Create payment intent via PayMongo
                const intentResult = await APTI_PayMongo.createPaymentIntent({
                    amount: Math.round(paymentData.amount * 100), // amount in cents
                    currency: 'PHP',
                    description: `Payment for tenant ${paymentData.tenantName} unit ${paymentData.unitNumber}`
                });

                if (!intentResult.success) {
                    throw new Error('Failed to create payment intent: ' + intentResult.error);
                }

                const paymentIntentId = intentResult.data.id;

                // Create payment method
                const methodResult = await APTI_PayMongo.createPaymentMethod({
                    type: 'card',
                    card: {
                        number: paymentData.cardNumber.replace(/\s+/g, ''),
                        exp_month: expMonth,
                        exp_year: expYear,
                        cvc: paymentData.cardCvv
                    }
                });

                if (!methodResult.success) {
                    throw new Error('Failed to create payment method: ' + methodResult.error);
                }

                const paymentMethodId = methodResult.data.id;

                // Attach payment method to intent
                const attachResult = await APTI_PayMongo.attachPaymentMethodToIntent(paymentIntentId, paymentMethodId);

                if (!attachResult.success) {
                    throw new Error('Failed to attach payment method: ' + attachResult.error);
                }

                // Confirm payment intent status
                if (attachResult.data.status !== 'succeeded') {
                    throw new Error('Payment was not successful. Status: ' + attachResult.data.status);
                }

                // Record payment as completed
                const payments = await getAdminData('payments');

                const newPayment = {
                    id: APTI_Utils.generateId(),
                    tenantId: paymentData.tenantId,
                    tenantName: paymentData.tenantName,
                    unitNumber: paymentData.unitNumber,
                    amount: parseFloat(paymentData.amount),
                    method: paymentData.method,
                    status: 'completed',
                    date: new Date(),
                    reference: paymentData.reference,
                    notes: paymentData.notes || '',
                    createdAt: new Date()
                };

                payments.push(newPayment);
                await saveAdminData('payments', payments);

                return {
                    success: true,
                    message: 'Credit card payment processed and recorded successfully',
                    data: newPayment
                };
            } else {
                // Non-credit card payment fallback
                const payments = await getAdminData('payments');

                const newPayment = {
                    id: APTI_Utils.generateId(),
                    tenantId: paymentData.tenantId,
                    tenantName: paymentData.tenantName,
                    unitNumber: paymentData.unitNumber,
                    amount: parseFloat(paymentData.amount),
                    method: paymentData.method,
                    status: paymentData.status || 'completed',
                    date: new Date(),
                    reference: paymentData.reference,
                    notes: paymentData.notes || '',
                    createdAt: new Date()
                };

                payments.push(newPayment);
                await saveAdminData('payments', payments);

                return {
                    success: true,
                    message: 'Payment recorded successfully',
                    data: newPayment
                };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update payment
        async update(id, paymentData) {
            try {
                await APTI_Utils.simulateApiDelay();

                const payments = await getAdminData('payments');
                const paymentIndex = payments.findIndex(p => p.id === id);

                if (paymentIndex === -1) {
                    throw new Error('Payment not found');
                }

                payments[paymentIndex] = {
                    ...payments[paymentIndex],
                    ...paymentData,
                    updatedAt: new Date()
                };

                await saveAdminData('payments', payments);

                return {
                    success: true,
                    message: 'Payment updated successfully',
                    data: payments[paymentIndex]
                };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },

    // Delete payment
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();

            const payments = await getAdminData('payments');
            const paymentIndex = payments.findIndex(p => p.id === id);

            if (paymentIndex === -1) {
                throw new Error('Payment not found');
            }

            payments.splice(paymentIndex, 1);
            await saveAdminData('payments', payments);

            return {
                success: true,
                message: 'Payment deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Confirm payment
    async confirm(id) {
        try {
            await APTI_Utils.simulateApiDelay();

            const payments = await getAdminData('payments');
            const paymentIndex = payments.findIndex(p => p.id === id);

            if (paymentIndex === -1) {
                throw new Error('Payment not found');
            }

            payments[paymentIndex].status = 'completed';
            payments[paymentIndex].confirmedAt = new Date();

            await saveAdminData('payments', payments);

            return {
                success: true,
                message: 'Payment confirmed successfully',
                data: payments[paymentIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Maintenance Management
const MaintenanceManager = {
    // Get all maintenance requests
    async getAll(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            let maintenance = await getAdminData('maintenance');

            // Apply filters
            if (filters.status) {
                maintenance = maintenance.filter(m => m.status === filters.status);
            }
            if (filters.priority) {
                maintenance = maintenance.filter(m => m.priority === filters.priority);
            }

            return { success: true, data: maintenance };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update maintenance request status
    async updateStatus(id, status, notes = '') {
        try {
            await APTI_Utils.simulateApiDelay();

            const maintenance = await getAdminData('maintenance');
            const requestIndex = maintenance.findIndex(m => m.id === id);

            if (requestIndex === -1) {
                throw new Error('Maintenance request not found');
            }

            maintenance[requestIndex].status = status;
            maintenance[requestIndex].notes = notes;
            maintenance[requestIndex].updatedAt = new Date();

            if (status === 'completed') {
                maintenance[requestIndex].completedAt = new Date();
            }

            await saveAdminData('maintenance', maintenance);

            return {
                success: true,
                message: 'Maintenance request updated successfully',
                data: maintenance[requestIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete maintenance request
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const maintenance = getAdminData('maintenance');
            const requestIndex = maintenance.findIndex(m => m.id === id);
            
            if (requestIndex === -1) {
                throw new Error('Maintenance request not found');
            }
            
            maintenance.splice(requestIndex, 1);
            saveAdminData('maintenance', maintenance);
            
            return {
                success: true,
                message: 'Maintenance request deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Announcements Management
const AnnouncementsManager = {
    // Get all announcements
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            return {
                success: true,
                data: getAdminData('announcements')
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create new announcement
    async create(announcementData) {
        try {
            await APTI_Utils.simulateApiDelay();

            const validation = APTI_Utils.validateForm(announcementData, {
                title: { required: true, label: 'Title' },
                content: { required: true, label: 'Content' }
            });

            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }

            const announcements = getAdminData('announcements');

            const newAnnouncement = {
                id: APTI_Utils.generateId(),
                title: announcementData.title,
                content: announcementData.content,
                status: announcementData.status || 'draft',
                category: announcementData.category || 'general',
                importance: announcementData.importance || 'medium',
                author: announcementData.author || 'Property Manager',
                publishedAt: announcementData.status === 'published' ? new Date() : null,
                expiresAt: announcementData.expiresAt ? new Date(announcementData.expiresAt) : null,
                attachments: announcementData.attachments || [],
                createdAt: new Date(),
                updatedAt: new Date()
            };

            announcements.push(newAnnouncement);
            saveAdminData('announcements', announcements);

            return {
                success: true,
                message: 'Announcement created successfully',
                data: newAnnouncement
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update announcement
    async update(id, announcementData) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const announcements = getAdminData('announcements');
            const announcementIndex = announcements.findIndex(a => a.id === id);
            
            if (announcementIndex === -1) {
                throw new Error('Announcement not found');
            }
            
            const updatedAnnouncement = {
                ...announcements[announcementIndex],
                ...announcementData,
                updatedAt: new Date()
            };
            
            // Set published date if status changed to published
            if (announcementData.status === 'published' && announcements[announcementIndex].status !== 'published') {
                updatedAnnouncement.publishedAt = new Date();
            }
            
            announcements[announcementIndex] = updatedAnnouncement;
            saveAdminData('announcements', announcements);
            
            return {
                success: true,
                message: 'Announcement updated successfully',
                data: updatedAnnouncement
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete announcement
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const announcements = getAdminData('announcements');
            const announcementIndex = announcements.findIndex(a => a.id === id);
            
            if (announcementIndex === -1) {
                throw new Error('Announcement not found');
            }
            
            announcements.splice(announcementIndex, 1);
            saveAdminData('announcements', announcements);
            
            return {
                success: true,
                message: 'Announcement deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Communication Manager
const CommunicationManager = {
    // Send SMS
    async sendSMS(recipients, message, templateId = null) {
        try {
            await APTI_Utils.simulateApiDelay(1000, 2000);
            
            if (!recipients || recipients.length === 0) {
                throw new Error('No recipients selected');
            }
            
            if (!message || message.trim() === '') {
                throw new Error('Message cannot be empty');
            }
            
            // Simulate SMS sending
            console.log('SMS sent to:', recipients);
            console.log('Message:', message);
            
            // Track analytics
            this.trackMessageAnalytics('sms', recipients.length, true);
            
            // Save message history
            this.saveMessageHistory({
                type: 'sms',
                recipients: recipients,
                message: message,
                templateId: templateId,
                status: 'sent',
                sentAt: new Date()
            });
            
            return {
                success: true,
                message: `SMS sent successfully to ${recipients.length} recipient(s)`,
                data: {
                    recipients: recipients,
                    message: message,
                    sentAt: new Date()
                }
            };
        } catch (error) {
            // Track failure
            this.trackMessageAnalytics('sms', recipients?.length || 0, false);
            return { success: false, error: error.message };
        }
    },

    // Send Email
    async sendEmail(recipients, subject, message, templateId = null) {
        try {
            await APTI_Utils.simulateApiDelay(1000, 2000);
            
            if (!recipients || recipients.length === 0) {
                throw new Error('No recipients selected');
            }
            
            if (!subject || subject.trim() === '') {
                throw new Error('Subject cannot be empty');
            }
            
            if (!message || message.trim() === '') {
                throw new Error('Message cannot be empty');
            }
            
            // Simulate email sending
            console.log('Email sent to:', recipients);
            console.log('Subject:', subject);
            console.log('Message:', message);
            
            // Track analytics
            this.trackMessageAnalytics('email', recipients.length, true);
            
            // Save message history
            this.saveMessageHistory({
                type: 'email',
                recipients: recipients,
                subject: subject,
                message: message,
                templateId: templateId,
                status: 'sent',
                sentAt: new Date()
            });
            
            return {
                success: true,
                message: `Email sent successfully to ${recipients.length} recipient(s)`,
                data: {
                    recipients: recipients,
                    subject: subject,
                    message: message,
                    sentAt: new Date()
                }
            };
        } catch (error) {
            // Track failure
            this.trackMessageAnalytics('email', recipients?.length || 0, false);
            return { success: false, error: error.message };
        }
    },

    // Track message analytics
    trackMessageAnalytics(type, count, success) {
        try {
            const communicationData = APTI_Utils.storage.get('apti_communication_data') || {
                messages: [],
                analytics: {
                    total: 0,
                    sms: 0,
                    email: 0,
                    success: 0
                }
            };
            
            communicationData.analytics.total += count;
            communicationData.analytics[type] += count;
            if (success) {
                communicationData.analytics.success += count;
            }
            
            APTI_Utils.storage.set('apti_communication_data', communicationData);
        } catch (error) {
            console.error('Error tracking analytics:', error);
        }
    },

    // Save message history
    saveMessageHistory(messageData) {
        try {
            const communicationData = APTI_Utils.storage.get('apti_communication_data') || {
                messages: [],
                analytics: {
                    total: 0,
                    sms: 0,
                    email: 0,
                    success: 0
                }
            };
            
            messageData.id = APTI_Utils.generateId();
            messageData.createdAt = new Date();
            
            communicationData.messages.unshift(messageData);
            
            // Keep only last 100 messages
            if (communicationData.messages.length > 100) {
                communicationData.messages = communicationData.messages.slice(0, 100);
            }
            
            APTI_Utils.storage.set('apti_communication_data', communicationData);
        } catch (error) {
            console.error('Error saving message history:', error);
        }
    },

    // Get message history
    async getMessageHistory(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const communicationData = APTI_Utils.storage.get('apti_communication_data') || {
                messages: [],
                analytics: {
                    total: 0,
                    sms: 0,
                    email: 0,
                    success: 0
                }
            };
            
            let messages = communicationData.messages;
            
            // Apply filters
            if (filters.type) {
                messages = messages.filter(m => m.type === filters.type);
            }
            if (filters.status) {
                messages = messages.filter(m => m.status === filters.status);
            }
            if (filters.startDate && filters.endDate) {
                const start = new Date(filters.startDate);
                const end = new Date(filters.endDate);
                messages = messages.filter(m => {
                    const sentDate = new Date(m.sentAt);
                    return sentDate >= start && sentDate <= end;
                });
            }
            
            return { success: true, data: messages };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get message analytics
    async getAnalytics() {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const communicationData = APTI_Utils.storage.get('apti_communication_data') || {
                messages: [],
                analytics: {
                    total: 0,
                    sms: 0,
                    email: 0,
                    success: 0
                }
            };
            
            return { success: true, data: communicationData.analytics };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Message Templates Manager
const MessageTemplatesManager = {
    // Get all templates
    async getAll() {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [
                {
                    id: 'welcome',
                    name: 'Welcome Message',
                    type: 'sms',
                    content: 'Welcome to our property! We\'re excited to have you as a tenant. Please let us know if you need anything.',
                    category: 'welcome'
                },
                {
                    id: 'rent_reminder',
                    name: 'Rent Reminder',
                    type: 'sms',
                    content: 'Friendly reminder: Your rent payment of ${amount} is due on ${due_date}. Thank you!',
                    category: 'billing'
                },
                {
                    id: 'maintenance_update',
                    name: 'Maintenance Update',
                    type: 'email',
                    subject: 'Maintenance Request Update',
                    content: 'Dear ${tenant_name},\n\nYour maintenance request for "${issue}" has been updated to ${status}.\n\nThank you,\nProperty Management Team',
                    category: 'maintenance'
                }
            ];
            
            return { success: true, data: templates };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get template by ID
    async getById(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [];
            const template = templates.find(t => t.id === id);
            
            if (!template) {
                throw new Error('Template not found');
            }
            
            return { success: true, data: template };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create new template
    async create(templateData) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const validation = APTI_Utils.validateForm(templateData, {
                name: { required: true, label: 'Template Name' },
                type: { required: true, label: 'Message Type' },
                content: { required: true, label: 'Template Content' }
            });
            
            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [];
            
            const newTemplate = {
                id: APTI_Utils.generateId(),
                name: templateData.name,
                type: templateData.type,
                subject: templateData.subject || '',
                content: templateData.content,
                category: templateData.category || 'general',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            templates.push(newTemplate);
            APTI_Utils.storage.set('apti_message_templates', templates);
            
            return {
                success: true,
                message: 'Template created successfully',
                data: newTemplate
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update template
    async update(id, templateData) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [];
            const templateIndex = templates.findIndex(t => t.id === id);
            
            if (templateIndex === -1) {
                throw new Error('Template not found');
            }
            
            templates[templateIndex] = {
                ...templates[templateIndex],
                ...templateData,
                updatedAt: new Date()
            };
            
            APTI_Utils.storage.set('apti_message_templates', templates);
            
            return {
                success: true,
                message: 'Template updated successfully',
                data: templates[templateIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete template
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [];
            const templateIndex = templates.findIndex(t => t.id === id);
            
            if (templateIndex === -1) {
                throw new Error('Template not found');
            }
            
            templates.splice(templateIndex, 1);
            APTI_Utils.storage.set('apti_message_templates', templates);
            
            return {
                success: true,
                message: 'Template deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get templates by category
    async getByCategory(category) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const templates = APTI_Utils.storage.get('apti_message_templates') || [];
            const filteredTemplates = templates.filter(t => t.category === category);
            
            return { success: true, data: filteredTemplates };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Lease Documents Management
const LeaseDocumentsManager = {
    // Get all lease documents
    async getAll(filters = {}) {
        try {
            await APTI_Utils.simulateApiDelay();
            let documents = getAdminData('leaseDocuments');
            
            // Apply filters
            if (filters.tenantId) {
                documents = documents.filter(d => d.tenantId === filters.tenantId);
            }
            if (filters.status) {
                documents = documents.filter(d => d.status === filters.status);
            }
            if (filters.unitNumber) {
                documents = documents.filter(d => d.unitNumber === filters.unitNumber);
            }
            
            return { success: true, data: documents };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Get document by ID
    async getById(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            const documents = getAdminData('leaseDocuments');
            const document = documents.find(d => d.id === id);
            
            if (!document) {
                throw new Error('Lease document not found');
            }
            
            return { success: true, data: document };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Create new lease document
    async create(documentData, file) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const validation = APTI_Utils.validateForm(documentData, {
                tenantId: { required: true, label: 'Tenant' },
                documentName: { required: true, label: 'Document Name' },
                startDate: { required: true, label: 'Start Date' },
                endDate: { required: true, label: 'End Date' }
            });
            
            if (!validation.isValid) {
                throw new Error(Object.values(validation.errors)[0]);
            }
            
            if (!file) {
                throw new Error('Please upload a document file');
            }
            
            // Validate file
            const fileValidation = APTI_Utils.validateFile(file, {
                maxSize: 10 * 1024 * 1024, // 10MB
                allowedTypes: ['application/pdf', 'image/jpeg', 'image/png']
            });
            
            if (!fileValidation.isValid) {
                throw new Error(fileValidation.errors[0]);
            }
            
            const documents = getAdminData('leaseDocuments');
            const tenants = getAdminData('tenants');
            const units = getAdminData('units');
            
            // Get tenant and unit info
            const tenant = tenants.find(t => t.id === documentData.tenantId);
            const unit = units.find(u => u.id === tenant?.unitId);
            
            const newDocument = {
                id: APTI_Utils.generateId(),
                tenantId: documentData.tenantId,
                tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant',
                unitNumber: unit ? unit.unitNumber : 'N/A',
                documentName: documentData.documentName,
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                status: documentData.status || 'active',
                startDate: new Date(documentData.startDate),
                endDate: new Date(documentData.endDate),
                notes: documentData.notes || '',
                uploadedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            // Simulate file upload and get URL
            const fileUrl = URL.createObjectURL(file);
            newDocument.fileUrl = fileUrl;
            
            documents.push(newDocument);
            saveAdminData('leaseDocuments', documents);
            
            return {
                success: true,
                message: 'Lease document uploaded successfully',
                data: newDocument
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Update lease document
    async update(id, documentData) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const documents = getAdminData('leaseDocuments');
            const documentIndex = documents.findIndex(d => d.id === id);
            
            if (documentIndex === -1) {
                throw new Error('Lease document not found');
            }
            
            documents[documentIndex] = {
                ...documents[documentIndex],
                ...documentData,
                updatedAt: new Date()
            };
            
            saveAdminData('leaseDocuments', documents);
            
            return {
                success: true,
                message: 'Lease document updated successfully',
                data: documents[documentIndex]
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Delete lease document
    async delete(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const documents = getAdminData('leaseDocuments');
            const documentIndex = documents.findIndex(d => d.id === id);
            
            if (documentIndex === -1) {
                throw new Error('Lease document not found');
            }
            
            documents.splice(documentIndex, 1);
            saveAdminData('leaseDocuments', documents);
            
            return {
                success: true,
                message: 'Lease document deleted successfully'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Download document
    async download(id) {
        try {
            await APTI_Utils.simulateApiDelay();
            
            const documents = getAdminData('leaseDocuments');
            const document = documents.find(d => d.id === id);
            
            if (!document) {
                throw new Error('Lease document not found');
            }
            
            // Simulate download (in real app, this would fetch from server)
            return {
                success: true,
                data: document
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// File upload handler
async function handleFileUpload(file, type = 'image') {
    try {
        // Validate file
        const validation = APTI_Utils.validateFile(file, {
            maxSize: type === 'document' ? 10 * 1024 * 1024 : 5 * 1024 * 1024, // 10MB for docs, 5MB for images
            allowedTypes: type === 'document' ? 
                ['application/pdf', 'image/jpeg', 'image/png'] : 
                ['image/jpeg', 'image/png', 'image/gif']
        });
        
        if (!validation.isValid) {
            throw new Error(validation.errors[0]);
        }
        
        // Simulate file upload
        await APTI_Utils.simulateApiDelay(500, 1500);
        
        // Create file URL (in real app, this would be uploaded to server)
        const fileUrl = URL.createObjectURL(file);
        
        return {
            success: true,
            data: {
                url: fileUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date()
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Initialize admin module
function initAdmin() {
    initializeAdminData();
}

// Export admin functions
window.APTI_Admin = {
    UnitsManager,
    BillsManager,
    PaymentsManager,
    MaintenanceManager,
    AnnouncementsManager,
    CommunicationManager,
    LeaseDocumentsManager,
    handleFileUpload,
    getAdminData,
    saveAdminData,
    initAdmin
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdmin);