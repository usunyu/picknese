from django import forms
from models import PickProvider

class PickProviderForm(forms.ModelForm):
	
	class Meta:
		model = PickProvider
		fields = (
			'price',
			'description',
		)
		widgets = {
			'description' : forms.Textarea(attrs = {'placeholder': 'Please input informations you can provide, such as, the type of your car, how many luggages you can hold, etc.'}),
		}
