from django import forms
from models import University

class UniversityForm(forms.ModelForm):
	class Meta:
		model = University
		fields = (
			'name',
			'shorthand',
			'url',
			'description',
			'system',
			'address',
			'state',
			'country',
		)
