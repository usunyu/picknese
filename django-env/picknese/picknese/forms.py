from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class PickneseSignUpForm(UserCreationForm):
	first_name = forms.CharField(required=True)
	last_name = forms.CharField(required=True)
	email = forms.EmailField(required=True)

	class Meta:
		model = User
		fields = ('username', 'email', 'first_name', 'last_name', 'password1', 'password2')

	def save(self, commit=True):
		user = super(UserCreationForm, self).save(commit=False)
		user.first_name = self.cleaned_data['first_name']
		user.last_name = self.cleaned_data['last_name']
		user.email = self.cleaned_data['email']

		if commit:
			user.save()

		return user