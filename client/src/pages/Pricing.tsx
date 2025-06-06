import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipPlans from "@/components/MembershipPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star } from "lucide-react";

const Pricing = () => {
  const comparisonFeatures = [
    {
      feature: "24/7 Facility Access",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Trackman Technology",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Virtual Golf Courses",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Shot Analysis & Data",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Practice Facilities",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Games & Challenges",
      monthly: true,
      sixMonth: true,
      annual: true,
      punchPass: true,
    },
    {
      feature: "Priority Booking",
      monthly: false,
      sixMonth: true,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Guest Privileges",
      monthly: false,
      sixMonth: true,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Advanced Analytics",
      monthly: false,
      sixMonth: true,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Tournament Access",
      monthly: false,
      sixMonth: true,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Equipment Storage",
      monthly: false,
      sixMonth: false,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Private Lessons Discount",
      monthly: false,
      sixMonth: false,
      annual: true,
      punchPass: false,
    },
    {
      feature: "VIP Tournament Access",
      monthly: false,
      sixMonth: false,
      annual: true,
      punchPass: false,
    },
    {
      feature: "Concierge Booking",
      monthly: false,
      sixMonth: false,
      annual: true,
      punchPass: false,
    },
  ];

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
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Membership Plans
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the perfect membership plan for your golf journey. All plans
            include access to our premium Trackman technology and
            professional-grade facility.
          </p>
          <Badge className="bg-orange-500 hover:bg-orange-500 text-white px-4 py-2">
            Price does not include tax
          </Badge>
        </div>
      </section>

      <MembershipPlans />

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compare Membership Features
            </h2>
            <p className="text-xl text-gray-600">
              See what's included with each membership tier
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Monthly
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    <div className="flex items-center justify-center">
                      6 Month
                      <Star className="w-4 h-4 text-yellow-500 ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Annual
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Punch Pass
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFeatures.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.monthly ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-green-50">
                      {item.sixMonth ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.annual ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.punchPass ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What's included in the orientation session?
                </h3>
                <p className="text-gray-600">
                  All new members receive a complimentary 60-minute orientation
                  that covers facility rules, Trackman system usage, booking
                  procedures, and basic instruction on how to maximize your
                  practice sessions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I book simulator time?
                </h3>
                <p className="text-gray-600">
                  Members can book simulator time through our online booking
                  system or mobile app. Priority booking is available for
                  6-month and annual members.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I bring guests?
                </h3>
                <p className="text-gray-600">
                  6-month and annual members can bring guests. 6-month members
                  receive 2 guest passes per month, while annual members have
                  unlimited guest privileges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens if I need to cancel my membership?
                </h3>
                <p className="text-gray-600">
                  Monthly memberships can be cancelled with 30 days notice.
                  6-month and annual memberships are commitment-based but can be
                  transferred to another person with approval.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
