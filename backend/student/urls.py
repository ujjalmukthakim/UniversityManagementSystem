from rest_framework.routers import DefaultRouter
from .views import StudentViewSet

router=DefaultRouter()
router.register(r'',StudentViewSet,basename='studentView')

urlpatterns = router.urls