const sequelize = require('../config/sequelizeConfig');
const User = require('./user');
const Product = require('./product');
const Provider = require('./provider');
const Invoice = require('./invoice');
const Collection = require('./Collection');
const Category = require('./categories');
const InvoiceDetails = require('./invoiceDetails');
const Valoration = require('./valoration');
const ProductImages = require('./productImages');
const ClotheInventory = require('./clotheInventory');
const ProductProvides = require('./productProvides');
const Address = require('./address');
const Phone = require('./phone');
const Role = require('./role');
const Inventory = require('./inventory');
const ClotheSizing = require('./clotheSizing');
const Size = require('./size');

// Definition of relationships

// User - Phone
User.hasMany(Phone, { foreignKey: 'id_usuario' });
Phone.belongsTo(User, { foreignKey: 'id_usuario' });

// User - Role
User.hasMany(Role, { foreignKey: 'id_usuario' });
Role.belongsTo(User, { foreignKey: 'id_usuario' });

// User - Address
User.hasMany(Address, { foreignKey: 'id_usuario' });
Address.belongsTo(User, { foreignKey: 'id_usuario' });

// Collection - Product
Collection.hasMany(Product, { foreignKey: 'id_coleccion' });
Product.belongsTo(Collection, { foreignKey: 'id_coleccion' });

// Type - Product
Category.hasMany(Product, { foreignKey: 'id_Tipo' });
Product.belongsTo(Category, { foreignKey: 'id_Tipo' });

// Provider - ProductProvides
Provider.hasMany(ProductProvides, { foreignKey: 'id_proveedor' });
ProductProvides.belongsTo(Provider, { foreignKey: 'id_proveedor' });

// Product - ProductProvides
Product.hasMany(ProductProvides, { foreignKey: 'id_producto' });
ProductProvides.belongsTo(Product, { foreignKey: 'id_producto' });

// Product - Image
Product.hasMany(ProductImages, { foreignKey: 'id_Producto' });
ProductImages.belongsTo(Product, { foreignKey: 'id_Producto' });

// User - Valoration
User.hasMany(Valoration, { foreignKey: 'id_usuario' });
Valoration.belongsTo(User, { foreignKey: 'id_usuario' });

// Product - Valoration
Product.hasMany(Valoration, { foreignKey: 'id_producto' });
Valoration.belongsTo(Product, { foreignKey: 'id_producto' });

// Product - ClotheInventory
Product.hasMany(ClotheInventory, { foreignKey: 'id_producto' });
ClotheInventory.belongsTo(Product, { foreignKey: 'id_producto' });

// Product - Inventory
Product.hasMany(Inventory, { foreignKey: 'id_producto' });
Inventory.belongsTo(Product, { foreignKey: 'id_producto' });

// ClotheInventory - ClotheSizing
ClotheInventory.hasMany(ClotheSizing, { foreignKey: 'id_Inventario' });
ClotheSizing.belongsTo(ClotheInventory, { foreignKey: 'id_Inventario' });

// Size - ClotheSizing
Size.hasMany(ClotheSizing, { foreignKey: 'id_Talla' });
ClotheSizing.belongsTo(Size, { foreignKey: 'id_Talla' });


// User - Invoice
User.hasMany(Invoice, { foreignKey: 'id_usuario' });
Invoice.belongsTo(User, { foreignKey: 'id_usuario' });

// Invoice - InvoiceDetails
Invoice.hasMany(InvoiceDetails, { foreignKey: 'id_factura' });
InvoiceDetails.belongsTo(Invoice, { foreignKey: 'id_factura' });

// Product - InvoiceDetails
Product.hasMany(InvoiceDetails, { foreignKey: 'id_producto' });
InvoiceDetails.belongsTo(Product, { foreignKey: 'id_producto' });

module.exports = {
    User,
    Product,
    Provider,
    Invoice,
    Collection,
    Category,
    InvoiceDetails,
    Valoration,
    ProductImages,
    ClotheInventory,
    ProductProvides,
    Address,
    Phone,
    Role,
    Inventory,
    ClotheSizing,
    Size
};