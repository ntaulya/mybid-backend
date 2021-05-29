const { UniqueConstraintError } = require('sequelize');
const { cart } = require('../models');
const Controller = require('../core/controller');

class CartController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const validate = this.validate(['id', 'assetId', 'email', 'createdAt', 'endedAt']);

    if (validate) {
      const {
        id, assetId, email, createdAt, endedAt
      } = validate;

      try {
        const user = await cart.create({
          id, assetId, email, createdAt, endedAt
        });
        return this.sendResponse({
          id: cart.id,
          assetId: cart.assetId,
          email: cart.email,
          createdAt: cart.createdAt,
          endedAt: cart.endedAt
        }, 'Success register', 201);
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          return this.sendResponse(null, 'Email already used', 400);
        }
        return this.sendResponse(null, 'Failed', 400);
      }
    }

    return null;
  }

  async update() {
    const { assetId } = this.req.params;
    const validate = this.validate(['assetId', 'type', 'email']);

    if (validate) {
      const {
        assetId, type, email
      } = validate;

      try {
        await cart.update({
          assetId, type, email
        }, {
          where: { id },
        });

        return this.sendResponse({
          assetId,
          type,
          email
        }, 'Success update');
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          return this.sendResponse(null, 'Email already used', 400);
        }
        return this.sendResponse(null, 'Failed', 400);
      }
    }

    return null;
  }
  async delete(){
  const { id } = req.params;
  try {
    const data = await cart.findOne({
      where : {
        id: id
      }
    })
    if(!data){
      return null
    }
    await cart.destroy({
      where : {
        id: id
      }
    })
    return this.sendResponse({
      status : 'ok',
      server_message : 'record deleted'
    })
  } catch (err) {
    console.log(err)
    return null
  }
}
}

module.exports = CartController;