
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", values);
    
    toast.success("Thank you for your message! We'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our retreats or community? We're here to help.
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject of your inquiry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message" 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-4">
              Sanghos Headquarters<br />
              123 Meditation Way<br />
              San Francisco, CA 94110
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Email & Phone</h3>
            <p className="text-muted-foreground mb-2">
              <strong>Email:</strong> info@sanghos.com
            </p>
            <p className="text-muted-foreground">
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 5:00 PM PST<br />
              Saturday: By appointment<br />
              Sunday: Closed
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
