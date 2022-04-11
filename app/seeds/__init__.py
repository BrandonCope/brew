from flask.cli import AppGroup
from .users import seed_users, undo_users
from .brewery import seed_breweries, undo_breweries
from .images import seed_images, undo_images
from .reviews import seed_reviews, undo_reviews
from .useful import seed_useful, undo_useful
from .funny import seed_funny, undo_funny
from .cool import seed_cool, undo_cool

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_breweries()
    seed_images()
    seed_reviews()
    seed_useful()
    seed_funny()
    seed_cool
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_breweries()
    undo_images()
    undo_reviews()
    undo_useful()
    undo_funny()
    undo_cool
    # Add other undo functions here
