from django.shortcuts import render, get_object_or_404

from university.models import University
from pickup.models import PickProvider

# Create your views here.
def index(request, university_id):
	university = get_object_or_404(University, id=university_id)
	pickers = []
	try:
		pick_providers = PickProvider.objects.filter(university=university)
		for pick_provider in pick_providers:
			pickers.append(pick_provider.picker)
	except:
		pickers = []

	context = {
		'university': university,
		'pickers': pickers,
	}
	return render(request, 'pickup/index.html', context)