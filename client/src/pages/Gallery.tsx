import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Play, Users, Target } from "lucide-react";

const Gallery = () => {
  const galleryItems = [
    {
      title: "Simulator Bay 1",
      description: "Premium Trackman setup with comfortable seating area",
      category: "Facility",
      image: "simulator-bay-1",
    },
    {
      title: "Practice Session",
      description: "Member working on swing mechanics with real-time feedback",
      category: "Practice",
      image: "practice-session",
    },
    {
      title: "Virtual Golf Course",
      description: "Playing Pebble Beach with stunning visual quality",
      category: "Virtual Golf",
      image: "virtual-course",
    },
    {
      title: "Shot Analysis",
      description: "Detailed ball flight data and impact analysis",
      category: "Technology",
      image: "shot-analysis",
    },
    {
      title: "Group Session",
      description: "Friends enjoying competitive golf games",
      category: "Social",
      image: "group-session",
    },
    {
      title: "Training Mode",
      description: "Working on specific shot challenges and drills",
      category: "Training",
      image: "training-mode",
    },
    {
      title: "Lounge Area",
      description: "Comfortable viewing and relaxation space",
      category: "Facility",
      image: "lounge-area",
    },
    {
      title: "Tournament Play",
      description: "Competitive tournament with leaderboard display",
      category: "Competition",
      image: "tournament",
    },
    {
      title: "Equipment Setup",
      description: "Professional grade clubs and equipment available",
      category: "Equipment",
      image: "equipment",
    },
  ];

  const categories = [
    "All",
    "Facility",
    "Practice",
    "Virtual Golf",
    "Technology",
    "Social",
    "Training",
    "Competition",
    "Equipment",
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
          <div className="flex items-center justify-center mb-6">
            <Camera className="w-8 h-8 mr-3" />
            <Badge className="bg-orange-500 hover:bg-orange-500 text-white px-4 py-2">
              Photo Gallery
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            See Premier Golf in Action
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Explore our state-of-the-art facility, watch members in action, and
            get a glimpse of the Premier Golf experience through our photo
            gallery.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={
                  category === "All" ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="text-center z-10">
                      <div className="w-16 h-16 mx-auto mb-3 bg-green-600 rounded-full flex items-center justify-center">
                        {item.category === "Facility" && (
                          <Target className="w-8 h-8 text-white" />
                        )}
                        {item.category === "Practice" && (
                          <Play className="w-8 h-8 text-white" />
                        )}
                        {item.category === "Social" && (
                          <Users className="w-8 h-8 text-white" />
                        )}
                        {!["Facility", "Practice", "Social"].includes(
                          item.category,
                        ) && <Camera className="w-8 h-8 text-white" />}
                      </div>
                      <p className="text-green-800 font-semibold text-sm">
                        {item.image.replace(/-/g, " ").toUpperCase()}
                      </p>
                    </div>

                    {/* Category Badge */}
                    <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-600 text-white">
                      {item.category}
                    </Badge>

                    {/* Background Pattern */}
                    <div
                      className={
                        'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zM0 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z"/%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
                      }
                    ></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-green-600 hover:bg-gray-100"
                      >
                        View Full Size
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to See More?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a personal tour of our facility and experience the
              Premier Golf difference firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-8 py-3"
              >
                Schedule Facility Tour
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  State-of-the-Art Technology
                </h3>
                <p className="text-gray-600">
                  Experience the latest Trackman technology with
                  professional-grade accuracy and analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Premium Comfort
                </h3>
                <p className="text-gray-600">
                  Enjoy our luxurious facility with comfortable seating, climate
                  control, and premium amenities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Play className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Flexible Experience
                </h3>
                <p className="text-gray-600">
                  Practice, play virtual courses, compete with friends, or work
                  on specific aspects of your game.
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

export default Gallery;
