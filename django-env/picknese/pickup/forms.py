from django import forms
from models import PickProvider, PickUp

class PickProviderForm(forms.ModelForm):
	
	class Meta:
		model = PickProvider
		fields = (
			'university',
			'price',
			'description',
		)
		widgets = {
			'description': forms.Textarea(
				attrs = {
					'placeholder': 'Please input informations you can provide, ' +
						'such as, the type of your car, how many luggages you can hold, etc.'
				}
			),
		}

class PickUpForm(forms.ModelForm):

	class Meta:
		model = PickUp
		fields = (
			'picker',
			'pickee',
			'university',
			'flight',
			'description',
		)
		widgets = {
			'picker': forms.HiddenInput(),
			'pickee': forms.HiddenInput(),
			'university': forms.HiddenInput(),
			'flight': forms.TextInput(
				attrs = {
					'placeholder': 'Please input the correct Flight Number.',
				}
			),
			'description': forms.Textarea(
				attrs = {
					'placeholder': 'Please leave the messages to the Pickup Provider.'
				}
			),
		}