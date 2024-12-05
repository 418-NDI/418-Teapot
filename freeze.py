from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

# @freezer.register_generator
# def corps_details():
#     for partie in app:
#         yield {'product_id': product.id}


if __name__=='__main__':
    freezer.freeze()