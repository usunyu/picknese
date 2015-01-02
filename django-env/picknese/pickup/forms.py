from django import forms
from models import PickProvider

class PickProviderForm(forms.ModelForm):
	
	class Meta:
		model = PickProvider
		fields = (
			'price',
			'description',
		)
