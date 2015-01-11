from django import forms
from models import PickProvider, PickRequester, PickUp

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

class PickRequesterForm(forms.ModelForm):
	# TODO: dynamic form
	class Meta:
		model = PickRequester
		fields = (
			'pick_type',
			'flight',
			'price',
			'description',
		)
		widgets = {
			'description': forms.Textarea(
				attrs = {
					'placeholder': 'Please input informations you can provide, ' +
						'such as, the type of your car, how many luggages you have, etc. ' +
						'And we encourge pay for the driver who pick you up.'
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
					'placeholder': 'Please input the correct flight number.',
				}
			),
			'description': forms.Textarea(
				attrs = {
					'placeholder': 'Please leave the messages to the picker, such as your ' + 
						'contact information, let him/her easy to pick you up :)'
				}
			),
		}