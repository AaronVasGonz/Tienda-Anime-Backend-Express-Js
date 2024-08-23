class UserDetailsService {
    constructor(userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    async getUserDetailsById(id) {
        try {
            return await this.userDetailsRepository.getUserDetailsById(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user details ${error.message}`);
        }
    }

    async getUserOldImage(id) {
        try {
            return await this.userDetailsRepository.getUserOldImage(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user old image ${error.message}`);
        }
    }

    async getUserPhoneById(id) {
        try {
            return await this.userDetailsRepository.getUserPhoneById(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user phone ${error.message}`);
        }
    }

    async updateUserDetails(id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName) {
        try {
            return await this.userDetailsRepository.updateUserDetails(id, Nombre, Apellido, Apellido2, correo, PhoneData, AddressData, fileName);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating user details ${error.message}`);
        }
    }

    async getUserAddressById(id) {
        try {
            return await this.userDetailsRepository.getUserAddressById(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while getting user address ${error.message}`);
        }
    }

    async savePhone(id, phone) {
        try {
            return await this.userDetailsRepository.savePhone(id, phone);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving user phone ${error.message}`);
        }
    }

    async saveAddress(id, address) {
      
        try {
            return await this.userDetailsRepository.saveAddress(id, address);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while saving user address ${error.message}`);
        }
    }

    async updatePhone(id, phone) {
        try {
            return await this.userDetailsRepository.updatePhone(id, phone);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating user phone ${error.message}`);
        }
    }

    async updateAddress(id, address) {
        try {
            return await this.userDetailsRepository.updateAddress(id, address);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating user address ${error.message}`);
        }
    }

    async updatePassword(id, password) {
        try {
            return await this.userDetailsRepository.updatePassword(id, password);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while updating user password ${error.message}`);
        }
    }

    async deleteAccount(id) {
        try {
            return await this.userDetailsRepository.deleteAccount(id);
        } catch (error) {
            console.log(error);
            throw new Error(`Error while deleting user account ${error.message}`);
        }
    }

}

module.exports = UserDetailsService;