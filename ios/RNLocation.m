#import "RNLocation.h"
#import <CoreLocation/CoreLocation.h>
#import <React/RCTLog.h>

@implementation RNLocation {
    CLLocationManager *_locationManager;
    RCTResponseSenderBlock _successCallback;
}

RCT_EXPORT_MODULE(RNLocation);

- (instancetype)init {
    self = [super init];
    if (self) {
        _locationManager = [[CLLocationManager alloc] init];
        _locationManager.delegate = self;
    }
    return self;
}

RCT_EXPORT_METHOD(getCoordinates:(RCTResponseSenderBlock)successCallback errorCallback:(RCTResponseSenderBlock)errorCallback) {
    _successCallback = successCallback;
    
    [_locationManager requestAlwaysAuthorization];
    [_locationManager startUpdatingLocation];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations {
    CLLocation *currentLocation = [locations lastObject];
    NSDictionary *locationData = @{
         @"latitude": @(currentLocation.coordinate.latitude),
         @"longitude": @(currentLocation.coordinate.longitude)
     };
    _successCallback(@[locationData]);
    RCTLogInfo(@"locationData native: %@", locationData);
    [_locationManager stopUpdatingLocation];
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error {
    RCTLogInfo(@"Failed to get location: %@", error.localizedDescription);
}
@end

