 
 class CountriesService {
    constructor(phoneCodes) {
        this.phoneCodes = phoneCodes
    }
    getCountries() {
        return  this.phoneCodes;
    }
 }
 module.exports = CountriesService