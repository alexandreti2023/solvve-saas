from sqlalchemy.orm import declarative_base

Base = declarative_base()

from app.models.user import User
from app.models.calculation import Calculation
from app.models.client import Client
from app.models.process import Process
from app.models.process_event import ProcessEvent
from app.models.company import Company
from app.models.document import Document