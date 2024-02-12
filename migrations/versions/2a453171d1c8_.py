"""empty message

Revision ID: 2a453171d1c8
Revises: 1793db64312a
Create Date: 2024-02-01 19:02:55.426919

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2a453171d1c8'
down_revision = '1793db64312a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_data', schema=None) as batch_op:
        batch_op.alter_column('liters',
               existing_type=postgresql.DOUBLE_PRECISION(precision=53),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_data', schema=None) as batch_op:
        batch_op.alter_column('liters',
               existing_type=sa.String(),
               type_=postgresql.DOUBLE_PRECISION(precision=53),
               existing_nullable=True)

    # ### end Alembic commands ###