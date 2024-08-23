express = require('express');
const { authUser } = require('../middlewares/jwtServices');
const routerUserDetails = express.Router();
routerUserDetails.use(express.json());
const { fileUpload, upploadFileAvatarToFirebase, uploadAvatar } = require('../middlewares/files');
//Import services
const {UserDetailsRepository, UserDetailsService, StorageService, ImageManager} = require('../services/index');

//Services
const storageService = new StorageService();
const imageManagerService = new ImageManager();
const userDetailsRepository = new UserDetailsRepository(storageService);
const userDetailsService = new UserDetailsService(userDetailsRepository);

//Import Controllers
const UserDetailsController = require('../controllers/userDetailsController');

// Controllers
const userDetailsController = new UserDetailsController(userDetailsService,storageService, imageManagerService);

routerUserDetails.get('/userDetails/:id', authUser, userDetailsController.getUserDetails);
routerUserDetails.put('/userDetails/update/:id', authUser, uploadAvatar, upploadFileAvatarToFirebase, userDetailsController.updateUserDetails);
routerUserDetails.post('/userDetails/phone', authUser, userDetailsController.savePhone);
routerUserDetails.put('/userDetails/phone/update/:id', authUser, userDetailsController.updateUserPhone);
routerUserDetails.post('/userDetails/address', authUser ,userDetailsController.saveAddress);
routerUserDetails.put('/userDetails/address/update/:id', authUser, userDetailsController.updateUserAddress);
routerUserDetails.post('/userDetails/password/:id', authUser, userDetailsController.sendPasswodEmailChange);
routerUserDetails.put('/userDetails/password/update/:id', authUser, userDetailsController.updateUserPassword);
routerUserDetails.post('/usersAdmin/deleteAccount/:id', authUser, userDetailsController.deleteUser);

module.exports = routerUserDetails;
