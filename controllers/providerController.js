

class ProviderController {

    constructor(
        providerService,
        providerSaveService,
        providerUpdateService,
        providerDeleteService
    ) {
        this.providerService = providerService;
        this.providerSaveService = providerSaveService;
        this.providerUpdateService = providerUpdateService;
        this.providerDeleteService = providerDeleteService;
    }

    getProviders = async (req, res) => {

        try {
            const result = await this.providerService.getProviders();
            if (result.length === 0) {
                return res.status(404).json({ error: 'Providers not found' });
            }
            res.status(200).json({ providers: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while getting providers' });
        }
    }

    getProvider = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.providerService.getProviderById(id);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            res.status(200).json({ provider: result.dataValues });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener proveedor' });
        }
    }

    createProvider = async (req, res) => {
        const { sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedSatus } = req.body;
        try {
            const result = await this.providerSaveService.save(sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedSatus);
            if (!result) {
                return res.status(500).json({ error: 'Error while creating provider' });
            }
            res.status(200).json({ message: 'The provider has been created' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while creating provider' });
        }
    }

    updateProvider = async (req, res) => {
        const { id } = req.params;
        const { sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedStatus } = req.body;

        try {
            const result = await this.providerUpdateService.update(id, sanitizedName, sanitizedDescription, sanitizedNumber, sanitizedEmail, sanitizedAddress, sanitizedStatus);
            if (!result) {
                res.status(500).json({ error: 'Error while updating provider' });
            }
            res.status(200).json({ message: 'The provider has been updated' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while updating provider' });
        }
    }

    deleteProvider = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.providerDeleteService.delete(id);
            if (!result) {
                res.status(500).json({ error: 'Error while deleting provider' });
            }
            res.status(200).json({ message: 'The provider has been deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error while deleting provider' });
        }
    }
}

module.exports = ProviderController