import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coffee, Utensils, MapPin, CreditCard, ShoppingBag, Plus, Minus } from "lucide-react";

interface OrderModalProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ trigger, open, onOpenChange }) => {
    const [cart, setCart] = useState<{ name: string; price: number; quantity: number }[]>([]);

    const addToCart = (name: string, price: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === name);
            if (existing) {
                return prev.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { name, price, quantity: 1 }];
        });
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-cafe-bg-light border-b border-cafe-brown/10">
                    <DialogTitle className="text-2xl font-serif text-cafe-brown flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-cafe-teal" />
                        Start Your Order
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="drinks" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4 bg-white z-10">
                        <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-cafe-brown/5 rounded-xl">
                            <TabsTrigger value="drinks" className="data-[state=active]:bg-white data-[state=active]:text-cafe-teal data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <Coffee className="w-5 h-5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Drinks</span>
                            </TabsTrigger>
                            <TabsTrigger value="food" className="data-[state=active]:bg-white data-[state=active]:text-cafe-teal data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <Utensils className="w-5 h-5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Food</span>
                            </TabsTrigger>
                            <TabsTrigger value="location" className="data-[state=active]:bg-white data-[state=active]:text-cafe-teal data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <MapPin className="w-5 h-5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Location</span>
                            </TabsTrigger>
                            <TabsTrigger value="payment" className="data-[state=active]:bg-white data-[state=active]:text-cafe-teal data-[state=active]:shadow-sm py-3 flex flex-col gap-1 items-center transition-all">
                                <CreditCard className="w-5 h-5" />
                                <span className="text-xs font-medium uppercase tracking-wide">Payment</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-4 bg-cafe-bg-light/30">
                        <TabsContent value="drinks" className="mt-0 space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                {drinks.map((item) => (
                                    <Card key={item.name} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group">
                                        <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                                            <div className="space-y-1">
                                                <CardTitle className="text-lg font-medium text-cafe-brown group-hover:text-cafe-teal transition-colors">
                                                    {item.name}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-gray-500">{item.desc}</CardDescription>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="font-bold text-cafe-brown">${item.price.toFixed(2)}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 rounded-full p-0 border-cafe-teal/20 hover:bg-cafe-teal hover:text-white transition-colors"
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
                                    <Card key={item.name} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group">
                                        <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                                            <div className="space-y-1">
                                                <CardTitle className="text-lg font-medium text-cafe-brown group-hover:text-cafe-teal transition-colors">
                                                    {item.name}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-gray-500">{item.desc}</CardDescription>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="font-bold text-cafe-brown">${item.price.toFixed(2)}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 rounded-full p-0 border-cafe-teal/20 hover:bg-cafe-teal hover:text-white transition-colors"
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

                    {/* Footer containing Cart Summary if items exist */}
                    {cart.length > 0 && (
                        <div className="px-6 py-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">{cart.reduce((acc, i) => acc + i.quantity, 0)} items in cart</span>
                                    <span className="text-xl font-bold text-cafe-brown">${total.toFixed(2)}</span>
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
