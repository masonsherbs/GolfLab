import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  BarChart3,
  Eye,
  Zap,
  TrendingUp,
  Award,
  Play,
} from "lucide-react";

const Trackman = () => {
  const dataPoints = [
    {
      category: "Ball Data",
      points: [
        "Ball Speed",
        "Launch Angle",
        "Launch Direction",
        "Spin Rate",
        "Spin Axis",
      ],
    },
    {
      category: "Club Data",
      points: [
        "Club Speed",
        "Attack Angle",
        "Club Path",
        "Face Angle",
        "Dynamic Loft",
      ],
    },
    {
      category: "Impact",
      points: [
        "Smash Factor",
        "Impact Location",
        "Contact Quality",
        "Strike Pattern",
        "Sweet Spot",
      ],
    },
    {
      category: "Flight",
      points: [
        "Carry Distance",
        "Total Distance",
        "Apex Height",
        "Flight Time",
        "Landing Angle",
      ],
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Precision Tracking",
      description:
        "Dual radar technology tracks every shot with unmatched accuracy from short putts to 400-yard drives.",
    },
    {
      icon: BarChart3,
      title: "26+ Data Points",
      description:
        "Comprehensive analysis covering ball flight, club movement, and impact characteristics.",
    },
    {
      icon: Eye,
      title: "High-Speed Cameras",
      description:
        "Multiple camera angles capture every detail of your swing and ball impact.",
    },
    {
      icon: Zap,
      title: "Real-Time Feedback",
      description:
        "Instant data display helps you understand and adjust your technique immediately.",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description:
        "Track your improvement over time with detailed reports and trend analysis.",
    },
    {
      icon: Award,
      title: "PGA Tour Technology",
      description:
        "The same system used by professional golfers and top instructors worldwide.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 text-white overflow-hidden">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-white text-orange-700 hover:bg-white px-6 py-2 text-sm font-semibold">
              POWERED BY
            </Badge>
            <h1 className="text-6xl sm:text-7xl font-bold mb-6">TRACKMAN</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Experience the same professional-grade technology used by PGA Tour
              players, top instructors, and elite golf facilities worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-700 hover:bg-orange-50 px-8 py-3"
            >
              <Play className="mr-2 h-5 w-5" />
              See Trackman in Action
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-700 px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* What is Trackman */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is Trackman?
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  TrackMan is the industry leader in golf performance analysis,
                  combining dual radar technology with high-end optics to
                  provide the most accurate and comprehensive data available in
                  golf today.
                </p>
                <p>
                  Used by PGA Tour professionals, top instructors, and elite
                  golf facilities worldwide, TrackMan tracks every aspect of
                  your golf shot with unprecedented precision, from the moment
                  the club impacts the ball to when it lands.
                </p>
                <p>
                  The system captures over 26 data points for every shot,
                  providing insights that help golfers of all skill levels
                  understand their game and improve faster than ever before.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center">
                      <Target className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-orange-800 text-lg font-semibold">
                      Trackman Radar
                    </p>
                    <p className="text-orange-600">Dual Radar Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trackman Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why Trackman is the gold standard in golf performance
              analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Points */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Does Trackman Track?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TrackMan captures over 26 data points, providing comprehensive
              insights into every aspect of your golf performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dataPoints.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="text-gray-600 text-sm flex items-center"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Proven Results</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              TrackMan users consistently see dramatic improvements in their
              golf game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  6-10
                </div>
                <div className="text-xl text-white mb-2">Stroke Reduction</div>
                <div className="text-gray-400">
                  Average improvement per year
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  95%
                </div>
                <div className="text-xl text-white mb-2">Accuracy Rate</div>
                <div className="text-gray-400">Data measurement precision</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-orange-500 mb-2">
                  200+
                </div>
                <div className="text-xl text-white mb-2">Tour Pros</div>
                <div className="text-gray-400">Use TrackMan technology</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 mb-8">
              You won't just improve, you'll improve faster than you thought
              possible.
            </p>
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3"
            >
              Experience Trackman Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Trackman;
