import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  MessageCircle,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Ready to start your golf journey? Have questions about our facility?
            We'd love to hear from you and help you get started.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Speak with our team directly
                </p>
                <Button variant="outline" className="w-full">
                  208 - 727 - 7256
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Schedule Tour
                </h3>
                <p className="text-gray-600 mb-4">Book a facility tour</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Book Tour
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Join Waitlist
                </h3>
                <p className="text-gray-600 mb-4">Be the first to know</p>
                <Button variant="outline" className="w-full">
                  Join Waitlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Additional Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hours and Policies */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Hours & Policies
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Facility Hours
                        </h3>
                        <div className="text-gray-600 space-y-1">
                          <p>
                            <strong>Members:</strong> 24/7 Access with Badge
                          </p>
                          <p>
                            <strong>Office Hours:</strong> Monday - Friday, 9:00
                            AM - 6:00 PM
                          </p>
                          <p>
                            <strong>Weekend Support:</strong> Saturday - Sunday,
                            10:00 AM - 4:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Booking Policy
                    </h3>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• Sessions can be booked up to 7 days in advance</li>
                      <li>• Maximum session length: 2 hours</li>
                      <li>• Cancellations must be made 2 hours prior</li>
                      <li>• No-shows may result in booking restrictions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Guest Policy
                    </h3>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• All guests must be accompanied by a member</li>
                      <li>• Guest limits vary by membership tier</li>
                      <li>• Guests must complete safety orientation</li>
                      <li>• Members are responsible for guest behavior</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Location and Directions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Location & Directions
              </h2>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Address
                      </h3>
                      <p className="text-gray-600 mb-4">
                        1540 E Fairview Ave, Suite 104
                        <br />
                        Meridian, Idaho 83642
                      </p>
                      <Button variant="outline" size="sm">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <p className="text-green-800 font-semibold text-lg">
                      Interactive Map
                    </p>
                    <p className="text-green-600">Premier Golf Location</p>
                    <p className="text-green-600 text-sm mt-2">
                      Meridian, Idaho
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Parking Information
                </h3>
                <p className="text-blue-800 text-sm">
                  Free parking is available directly in front of our facility.
                  The building is easily accessible with elevator access to
                  Suite 104.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
