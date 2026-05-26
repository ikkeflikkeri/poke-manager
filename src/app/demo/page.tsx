'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function DemoPage() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [selectedSelect, setSelectedSelect] = useState('');
  const [textInput, setTextInput] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">shadcn UI Components</h1>
          <p className="text-lg text-slate-600">A comprehensive showcase of shadcn/ui components</p>
          <Link href="/" className="text-sm text-blue-600 hover:underline mt-4 inline-block">
            ← Back to home
          </Link>
        </div>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Buttons</h2>
          <Card className="p-8">
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Badges</h2>
          <Card className="p-8">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the code below.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Forms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Form Elements</h2>
          <Card className="p-8">
            <div className="space-y-8">
              {/* Input */}
              <div>
                <Label htmlFor="input">Text Input</Label>
                <Input
                  id="input"
                  type="text"
                  placeholder="Enter some text..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Textarea */}
              <div>
                <Label htmlFor="textarea">Textarea</Label>
                <Textarea
                  id="textarea"
                  placeholder="Write a message..."
                  className="mt-2"
                />
              </div>

              {/* Select */}
              <div>
                <Label htmlFor="select">Select an option</Label>
                <Select value={selectedSelect} onValueChange={setSelectedSelect}>
                  <SelectTrigger id="select" className="mt-2">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkbox"
                  checked={selectedCheckbox}
                  onCheckedChange={setSelectedCheckbox}
                />
                <Label htmlFor="checkbox">Accept terms and conditions</Label>
              </div>

              {/* Radio Group */}
              <div>
                <Label>Choose one</Label>
                <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="radio1" />
                    <Label htmlFor="radio1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="radio2" />
                    <Label htmlFor="radio2">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="radio3" />
                    <Label htmlFor="radio3">Option 3</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>
        </section>

        {/* Tabs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Tabs</h2>
          <Card className="p-8">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-6">
                <p className="text-slate-600">This is the content for Tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-6">
                <p className="text-slate-600">This is the content for Tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-6">
                <p className="text-slate-600">This is the content for Tab 3</p>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        {/* Accordion Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Accordion</h2>
          <Card className="p-8">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that you can customize to your needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </section>

        {/* Dialog Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Dialog</h2>
          <Card className="p-8">
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 h-10">
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog component. Click outside or press ESC to close.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-slate-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        </section>

        {/* Cards Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="mb-4">
                  <Badge>Featured</Badge>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Card {i}</h3>
                <p className="text-slate-600 mb-4">
                  This is a card component showcasing different content layouts.
                </p>
                <Button variant="outline" size="sm">
                  Learn more
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Box */}
        <section className="mb-12">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>All components are ready!</AlertTitle>
            <AlertDescription>
              This demo showcases the most commonly used shadcn/ui components. Visit the{' '}
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                shadcn/ui documentation
              </a>{' '}
              for more components and customization options.
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </div>
  );
}
