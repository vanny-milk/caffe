import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coffee, Utensils, MapPin, CreditCard, ShoppingBag, Plus, Minus, Star, Navigation, Store } from "lucide-react";

interface OrderModalProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ trigger, open, onOpenChange }) => {
    const [cart, setCart] = useState<{ name: string; price: number; quantity: number }[]>([]);
    const [locationMode, setLocationMode] = useState<'pickup' | 'gps' | 'manual' | null>(null);
    const [gpsLoading, setGpsLoading] = useState(false);
    const [address, setAddress] = useState("");

    const addToCart = (name: string, price: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === name);
            if (existing) {
                return prev.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { name, price, quantity: 1 }];
        });
    };

    const addComboToCart = (items: { name: string, price: number }[]) => {
        items.forEach(item => addToCart(item.name, item.price));
    };

    const removeFromCart = (name: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === name);
            if (existing && existing.quantity > 1) {
                return prev.map(item => item.name === name ? { ...item, quantity: item.quantity - 1 } : item);
            }
            return prev.filter(item => item.name !== name);
        });
    };

    const handleGpsLocation = () => {
        setLocationMode('gps');
        setGpsLoading(true);
        setTimeout(() => {
            setAddress("123 Mockingbird Lane, New York, NY");
            setGpsLoading(false);
        }, 1500);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const drinks = [
        { name: "Signature Latte", price: 5.50, desc: "Espresso, steamed milk, house-made vanilla bean syrup" },
        { name: "Cold Brew", price: 4.75, desc: "Steeped for 12 hours, smooth & rich" },
        { name: "Matcha Latte", price: 6.00, desc: "Premium ceremonial grade matcha, oat milk" },
        { name: "Cappuccino", price: 5.00, desc: "Double shot espresso, heavy foam" },
        { name: "Cortado", price: 4.50, desc: "Equal parts espresso and steamed milk" },
    ];

    const food = [
        { name: "Almond Croissant", price: 5.25, desc: "Buttery pastry filled with almond paste" },
        { name: "Avocado Toast", price: 12.00, desc: "Sourdough, smashed avo, chili flakes, radish" },
        { name: "Smoked Salmon Bagel", price: 14.50, desc: "Cream cheese, capers, dill, red onion" },
        { name: "Blueberry Muffin", price: 4.25, desc: "Fresh berries, streusel topping" },
        { name: "Breakfast Burrito", price: 11.00, desc: "Eggs, chorizo, potato, cheese, salsa" },
    ];

    const specials = [
        {
            name: "Morning Kickstart",
            price: 9.75, // 5.50 + 4.25
            desc: "Signature Latte + Blueberry Muffin",
            image: "/morning-kickstart.png",
            items: [
                { name: "Signature Latte", price: 5.50 },
                { name: "Blueberry Muffin", price: 4.25 }
            ]
        },
        {
            name: "Lunch Break",
            price: 15.75, // 4.75 + 11.00
            desc: "Cold Brew + Breakfast Burrito",
            image: "/lunch-break.png",
            items: [
                { name: "Cold Brew", price: 4.75 },
                { name: "Breakfast Burrito", price: 11.00 }
            ]
        },
        {
            name: "Sweet Escape",
            price: 10.25, // 5.00 + 5.25
            desc: "Cappuccino + Almond Croissant",
            image: "/sweet-escape.png",
            items: [
                { name: "Cappuccino", price: 5.00 },
                { name: "Almond Croissant", price: 5.25 }
            ]
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-blue-950 border-b border-white/10">
                    <DialogTitle className="text-2xl font-serif text-white flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-white" />
                        Start Your Order
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="specials" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4 bg-white z-10">
                        <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-cafe-brown/5 rounded-xl">
                            <TabsTrigger value="specials" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-[10px] font-bold uppercase tracking-wide">Specials</span>
                            </TabsTrigger>
                            <TabsTrigger value="drinks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <Coffee className="w-5 h-5" />
                                <span className="text-[10px] font-medium uppercase tracking-wide">Drinks</span>
                            </TabsTrigger>
                            <TabsTrigger value="food" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <Utensils className="w-5 h-5" />
                                <span className="text-[10px] font-medium uppercase tracking-wide">Food</span>
                            </TabsTrigger>
                            <TabsTrigger value="location" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <MapPin className="w-5 h-5" />
                                <span className="text-[10px] font-medium uppercase tracking-wide">Location</span>
                            </TabsTrigger>
                            <TabsTrigger value="payment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <CreditCard className="w-5 h-5" />
                                <span className="text-[10px] font-medium uppercase tracking-wide">Payment</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1 bg-cafe-bg-light/30">
                        <div className="px-6 py-4">
                            <TabsContent value="specials" className="mt-0 space-y-4">
                                <div className="text-center mb-6">
                                    <h3 className="font-serif text-xl text-cafe-brown">House Suggestions</h3>
                                    <p className="text-sm text-gray-500">Curated combos for the perfect experience</p>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {specials.map((item) => (
                                        <Card key={item.name} className="relative overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow group h-32">
                                            {/* Background Image */}
                                            <div
                                                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 z-10 bg-black/50 group-hover:bg-black/40 transition-colors" />

                                            <CardHeader className="relative z-20 p-4 h-full flex flex-row items-center justify-between space-y-0">
                                                <div className="space-y-1 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <CardTitle className="text-xl font-bold text-white drop-shadow-md">
                                                            {item.name}
                                                        </CardTitle>
                                                    </div>
                                                    <CardDescription className="text-sm text-gray-200 font-medium drop-shadow-sm line-clamp-2">{item.desc}</CardDescription>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 pl-4">
                                                    <span className="font-bold text-xl text-white drop-shadow-md">${item.price.toFixed(2)}</span>
                                                    <Button
                                                        size="sm"
                                                        className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/50 shadow-md transition-transform active:scale-95"
                                                        onClick={() => addComboToCart(item.items)}
                                                    >
                                                        Add Combo
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="drinks" className="mt-0 space-y-4">
                                <div className="grid grid-cols-1 gap-3">
                                    {drinks.map((item) => (
                                        <Card key={item.name} className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow group bg-white">
                                            <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                                        {item.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm text-gray-500">{item.desc}</CardDescription>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 w-8 rounded-full p-0 border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
                                                        onClick={() => addToCart(item.name, item.price)}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="food" className="mt-0 space-y-4">
                                <div className="grid grid-cols-1 gap-3">
                                    {food.map((item) => (
                                        <Card key={item.name} className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow group bg-white">
                                            <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                                        {item.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm text-gray-500">{item.desc}</CardDescription>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 w-8 rounded-full p-0 border-blue-200 hover:bg-blue-600 hover:text-white transition-colors"
                                                        onClick={() => addToCart(item.name, item.price)}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="location" className="mt-0 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <Button
                                        variant={locationMode === 'pickup' ? 'default' : 'outline'}
                                        className={`h-auto py-4 flex flex-col gap-2 ${locationMode === 'pickup' ? 'bg-cafe-teal text-white' : 'hover:border-cafe-teal/50'}`}
                                        onClick={() => setLocationMode('pickup')}
                                    >
                                        <Store className="w-6 h-6" />
                                        <span className="text-xs font-bold">Pickup in Store</span>
                                    </Button>
                                    <Button
                                        variant={locationMode === 'gps' ? 'default' : 'outline'}
                                        className={`h-auto py-4 flex flex-col gap-2 ${locationMode === 'gps' ? 'bg-cafe-teal text-white' : 'hover:border-cafe-teal/50'}`}
                                        onClick={handleGpsLocation}
                                    >
                                        <Navigation className={`w-6 h-6 ${gpsLoading ? 'animate-spin' : ''}`} />
                                        <span className="text-xs font-bold">{gpsLoading ? 'Locating...' : 'Use GPS'}</span>
                                    </Button>
                                    <Button
                                        variant={locationMode === 'manual' ? 'default' : 'outline'}
                                        className={`h-auto py-4 flex flex-col gap-2 ${locationMode === 'manual' ? 'bg-cafe-teal text-white' : 'hover:border-cafe-teal/50'}`}
                                        onClick={() => setLocationMode('manual')}
                                    >
                                        <MapPin className="w-6 h-6" />
                                        <span className="text-xs font-bold">Enter Address</span>
                                    </Button>
                                </div>

                                {locationMode === 'pickup' && (
                                    <Card className="border-cafe-teal/20 bg-cafe-teal/5">
                                        <CardHeader>
                                            <CardTitle className="text-cafe-teal">Store Location</CardTitle>
                                            <CardDescription>Your order will be ready at:</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-cafe-brown mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-cafe-brown">Henrietta's Cafe</p>
                                                    <p className="text-sm text-gray-600">42 Coffee Beans Blvd.</p>
                                                    <p className="text-sm text-gray-600">Downtown District, NY 10001</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {locationMode === 'gps' && !gpsLoading && (
                                    <Card className="border-cafe-teal/20 bg-blue-50/50">
                                        <CardHeader>
                                            <CardTitle className="text-blue-700">Location Found</CardTitle>
                                            <CardDescription>Check if this is correct:</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2 mb-4">
                                                <MapPin className="w-5 h-5 text-blue-600" />
                                                <p className="font-medium text-gray-800">{address}</p>
                                            </div>
                                            <Button variant="link" className="text-xs p-0 h-auto text-blue-600" onClick={handleGpsLocation}>Update Location</Button>
                                        </CardContent>
                                    </Card>
                                )}

                                {(locationMode === 'manual' || (!locationMode && !gpsLoading)) && (
                                    <Card className="border-none shadow-md bg-white">
                                        <CardHeader>
                                            <CardTitle className="text-cafe-brown">Delivery Details</CardTitle>
                                            <CardDescription>Where should we bring your order?</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="address">Street Address</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input id="address" placeholder="123 Coffee Lane" className="pl-10" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="apt">Apt / Suite</Label>
                                                    <Input id="apt" placeholder="Apt 4B" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="zip">Zip Code</Label>
                                                    <Input id="zip" placeholder="10001" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="instructions">Delivery Instructions</Label>
                                                <Input id="instructions" placeholder="Leave at door, gate code 1234..." />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="payment" className="mt-0 space-y-6">
                                <Card className="border-none shadow-md bg-white">
                                    <CardHeader>
                                        <CardTitle className="text-cafe-brown">Payment Method</CardTitle>
                                        <CardDescription>Secure checkout</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="card">Card Number</Label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry</Label>
                                                <Input id="expiry" placeholder="MM/YY" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" />
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <span className="font-medium text-gray-600">Total Amount</span>
                                            <span className="text-2xl font-bold text-cafe-teal">${total.toFixed(2)}</span>
                                        </div>
                                        <Button className="w-full bg-cafe-teal hover:bg-cafe-teal/90 text-white font-bold py-6 text-lg shadow-lg shadow-cafe-teal/20 transition-all transform hover:-translate-y-1">
                                            Complete Order
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </ScrollArea>

                    {/* Footer containing Cart Summary if items exist */}
                    {cart.length > 0 && (
                        <div className="px-6 py-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">{cart.reduce((acc, i) => acc + i.quantity, 0)} items in cart</span>
                                    <span className="text-xl font-bold text-gray-800">${total.toFixed(2)}</span>
                                </div>
                                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setCart([])}>Clear</Button>
                            </div>
                        </div>
                    )}
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default OrderModal;
