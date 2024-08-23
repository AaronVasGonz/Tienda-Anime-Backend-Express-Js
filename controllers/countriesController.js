class CountriesController {

    constructor(countriesService) {
        this.countriesService = countriesService;
    }

    getCountries = async (req, res) => {
        try {
            const phoneCodes = await this.countriesService.getCountries();
            if (phoneCodes.length === 0) {
                return res.status(404).json({ error: 'Countries not found' });
            }
            return res.status(200).json({ phoneCodes });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error while getting countries' });
        }
    }
}

module.exports = CountriesController;