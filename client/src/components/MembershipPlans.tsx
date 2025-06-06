import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Star } from "lucide-react";

const MembershipPlans = () => {
  const plans = [
    {
      name: "Monthly",
      subtitle: "Membership",
      price: "$250",
      period: "per month",
      popular: false,
      features: [
        "Unlimited access 24/7",
        "Trackman technology",
        "Virtual golf courses",
        "Shot analysis",
        "Practice facilities",
        "Games and challenges",
      ],
    },
    {
      name: "6 Month",
      subtitle: "Membership",
      price: "$1,300",
      period: "6 months",
      popular: true,
      features: [
        "All monthly features",
        "Priority booking",
        "Guest privileges (2 per month)",
        "Advanced analytics",
        "Tournament access",
        "Discounted rates",
      ],
    },
    {
      name: "Annual",
      subtitle: "Membership",
      price: "$2,250",
      period: "per year",
      popular: false,
      features: [
        "All 6-month features",
        "Unlimited guest passes",
        "Private lessons discount",
        "Equipment storage",
        "VIP tournament access",
        "Concierge booking",
      ],
    },
    {
      name: "Punch Pass",
      subtitle: "Membership",
      price: "Variable",
      period: "pay per session",
      popular: false,
      punchOptions: [
        { sessions: "10 passes", price: "$250" },
        { sessions: "20 passes", price: "$450" },
        { sessions: "30 passes", price: "$600" },
      ],
      features: [
        "No monthly commitment",
        "Perfect for occasional play",
        "Same facility access",
        "90-day expiration",
        "Transferable passes",
        "Gift card option",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Membership Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership plan for your golf journey. All plans
            include access to our premium Trackman technology and facility.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Price does not include tax
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "ring-2 ring-green-500 shadow-lg scale-105"
                  : "hover:-translate-y-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-semibold">
                  <Star className="inline w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              <CardHeader
                className={`text-center ${plan.popular ? "pt-12" : "pt-8"}`}
              >
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600 mb-4">{plan.subtitle}</p>

                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-1">
                    {plan.price}
                  </div>
                  <p className="text-gray-500 text-sm">{plan.period}</p>
                </div>

                {plan.punchOptions && (
                  <div className="space-y-2 mb-4">
                    {plan.punchOptions.map((option, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{option.sessions}</span>
                        <span className="font-semibold">{option.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-800 hover:bg-gray-900"
                  }`}
                >
                  {plan.name === "Punch Pass" ? "Buy Passes" : "Get Started"}
                </Button>

                <Separator className="mb-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Special Introductory Offer
            </h3>
            <p className="text-blue-800">
              New members receive a complimentary 60-minute orientation session
              with our PGA-certified instructors. Learn how to maximize your
              Trackman experience and accelerate your improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
