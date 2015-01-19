from django import forms
from models import PickProvider, PickRequester, PickUp

class PickProviderForm(forms.ModelForm):
	
	class Meta:
		model = PickProvider
		fields = (
			'university',
		)

class PickRequesterForm(forms.ModelForm):
	# TODO: dynamic form
	class Meta:
		model = PickRequester
		fields = (
			'requester',
			'university',
			'pick_type',
			'flight',
			'price',
			'description',
		)
		widgets = {
			'requester': forms.HiddenInput(),
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
		widgets = {
			'picker': forms.HiddenInput(),
			'pickee': forms.HiddenInput(),
			'university': forms.HiddenInput(),
			'pick_type': forms.HiddenInput(),
			'price': forms.HiddenInput(),
			'flight': forms.HiddenInput(),
			'destination': forms.HiddenInput(),
			'description': forms.Textarea(
				attrs = {
					'placeholder': 'Thank you for your kindnese, leave messages!'
				}
			),
		}