# TODO: Replace Mock Admin Users with Firebase Authentication

## Remaining Tasks

### Update auth.js
- [ ] Remove MOCK_USERS for admin
- [ ] Replace loginAdmin function to use Firebase Authentication
- [ ] Replace signupAdmin function to use Firebase Authentication
- [ ] Remove localStorage mock user storage for admin
- [ ] Adjust token generation to use Firebase ID tokens
- [ ] Keep tenant mock users unchanged

### Testing
- [ ] Test admin registration with Firebase
- [ ] Test admin login with Firebase
- [ ] Verify admin dashboard access works
- [ ] Confirm tenant login/signup still works

## Plan Summary

**Information Gathered:**
- auth.js uses mock users in localStorage for admin login/signup
- Firebase is configured for admin authentication
- admin.js already uses Firestore for admin data
- Dashboard access control remains unchanged

**Plan:**
1. Edit auth.js to remove mock admin users and integrate Firebase Auth
2. Test admin registration and login
3. Verify dashboard functionality

**Dependent Files to be edited:**
- common/js/auth.js

**Followup steps:**
- [ ] Verify admin registration and login with Firebase Authentication
- [ ] Confirm tenant login/signup still works as expected
- [ ] Confirm admin dashboard access works as before
