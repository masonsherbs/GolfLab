import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, User, Calendar, Clock, Shield } from "lucide-react";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        rememberMe: false,
    });
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignUp) {
            toast({
                title: "Account created successfully!",
                description: "Welcome to Premier Golf. You can now book your sessions.",
            });
        } else {
            toast({
                title: "Welcome back!",
                description: "You're now logged in to your Premier Golf account.",
            });
        }

        // Reset form
        setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            rememberMe: false,
        });
    };

    const benefits = [
        { icon: Calendar, text: "Book simulator sessions 24/7" },
        { icon: Clock, text: "Real-time availability" },
        { icon: User, text: "Manage your membership" },
        { icon: Shield, text: "Secure payment processing" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-12 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
                <div
                    className={
                        'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
                    }
                ></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge className="mb-4 bg-orange-500 hover:bg-orange-500 text-white px-4 py-2">
                        Member Portal
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        {isSignUp ? "Join Premier Golf" : "Welcome Back"}
                    </h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                        {isSignUp
                            ? "Create your account to start booking premium golf simulator sessions"
                            : "Sign in to book your next golf simulator session"}
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Side - Benefits */}
                        <div className="lg:sticky lg:top-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Why Join Premier Golf?
                            </h2>

                            <div className="space-y-6 mb-8">
                                {benefits.map((benefit, index) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg text-gray-700 font-medium">
                                                    {benefit.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-green-900 mb-3">
                                        Premium Features
                                    </h3>
                                    <ul className="space-y-2 text-green-800">
                                        <li>• Access to Trackman technology</li>
                                        <li>• 200+ virtual golf courses</li>
                                        <li>• Advanced shot analysis</li>
                                        <li>• 24/7 facility access</li>
                                        <li>• Member-only tournaments</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Side - Login/Signup Form */}
                        <div>
                            <Card className="shadow-xl">
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl">
                                        {isSignUp ? "Create Account" : "Sign In"}
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        {isSignUp
                                            ? "Join the Premier Golf community"
                                            : "Access your member dashboard"}
                                    </p>
                                </CardHeader>

                                <CardContent className="px-8 pb-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {isSignUp && (
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="firstName">First Name *</Label>
                                                    <Input
                                                        id="firstName"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required={isSignUp}
                                                        className="mt-1"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="lastName">Last Name *</Label>
                                                    <Input
                                                        id="lastName"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required={isSignUp}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {isSignUp && (
                                            <div>
                                                <Label htmlFor="phone">Phone Number *</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required={isSignUp}
                                                    className="mt-1"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <Label htmlFor="email">Email Address *</Label>
                                            <div className="relative mt-1">
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="pl-10"
                                                />
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="password">Password *</Label>
                                            <div className="relative mt-1">
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="pl-10"
                                                />
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                            {isSignUp && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Must be at least 8 characters with uppercase,
                                                    lowercase, and number
                                                </p>
                                            )}
                                        </div>

                                        {!isSignUp && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="rememberMe"
                                                        checked={formData.rememberMe}
                                                        onCheckedChange={handleCheckboxChange}
                                                    />
                                                    <Label htmlFor="rememberMe" className="text-sm">
                                                        Remember me
                                                    </Label>
                                                </div>
                                                <Link
                                                    to="/forgot-password"
                                                    className="text-sm text-green-600 hover:text-green-700"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            {isSignUp ? "Create Account" : "Sign In"}
                                        </Button>

                                        {isSignUp && (
                                            <p className="text-xs text-gray-500 text-center">
                                                By creating an account, you agree to our{" "}
                                                <Link
                                                    to="/terms"
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link
                                                    to="/privacy"
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </p>
                                        )}
                                    </form>

                                    <Separator className="my-6" />

                                    <div className="text-center">
                                        <p className="text-gray-600">
                                            {isSignUp
                                                ? "Already have an account?"
                                                : "Don't have an account?"}
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={() => setIsSignUp(!isSignUp)}
                                            className="text-green-600 hover:text-green-700 font-semibold"
                                        >
                                            {isSignUp ? "Sign in here" : "Create account"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Support */}
                            <Card className="mt-6 bg-gray-50">
                                <CardContent className="p-6 text-center">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Need Help?
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Our team is here to assist you with any questions about
                                        membership or booking.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Button variant="outline" size="sm">
                                            Call (208) 727-7256
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Email Support
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Login;
