from django import forms
from models import PickProvider

class UniversityForm(forms.ModelForm):
	
	class Meta:
		model = PickProvider
		fields = (
			'name',
		)
