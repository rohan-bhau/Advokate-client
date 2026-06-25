"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  Label,
  Input,
  InputGroup,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Avatar,
  TextField,
  Card,
  ProgressBar,
} from "@heroui/react";
import { ChevronDown, Camera, ArrowLeft, Rocket } from "@gravity-ui/icons";
import { TbCloudUpload } from "react-icons/tb";
import { SPECIALIZATIONS } from "../specializations";
import { createLegalProfile } from "@/lib/actions/legalProfile";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { LuSparkles } from "react-icons/lu";


interface NewLegalProfileFormPageClientProps {
  plan: string;
}

export default function NewLegalProfileFormPageClient({
  plan, // 
}: NewLegalProfileFormPageClientProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, isPending } = useSession();

  // const plan = session?.user?.plan || "free";
  // console.log(session)

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // States
  const [name, setName] = useState("");
  const [hourlyFee, setHourlyFee] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [details, setDetails] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [specialization, setSpecialization] = useState<string>("");
  const [availability, setAvailability] = useState<string>("Available");

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const resData = await response.json();
      if (resData.success && resData.data?.url) {
        setLogoUrl(resData.data.url);
      }
    } catch (err) {
      console.error("ImgBB Upload crash trace:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!logoUrl) {
      toast.error("Profile Image Upload is required!");
      return;
    }
    setIsLoading(true);

    const legalPayload = {
      professionalName: name,
      specialization: specialization,
      hourlyFee: Number(hourlyFee).toString(),
      availabilityStatus: availability,
      location: location,
      ratings: "",
      bio: bio,
      details: details,
      image: logoUrl,
      status: "pending",
      lawyerId: session!.user.id,
      lawyerEmail: session!.user.email,
    };

    try {
      await createLegalProfile(legalPayload as any);
      toast.success("Legal profile created successfully!");
      router.push("/dashboard/lawyer/manage-legal-profile");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col  justify-center">
      {/* back button */}
      <div className="mb-6 w-full flex justify-start">
        <Button
          variant="ghost"
          onPress={() => router.back()}
          className="border-default-200 text-default-600 hover:text-[#1D44B7] rounded-xl h-10 px-4 text-sm font-semibold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Profiles
        </Button>
      </div>

      {plan === "free" ? (
        <Card className="bg-content1 border border-amber-200 dark:border-amber-900/40 p-8 rounded-2xl text-center flex flex-col items-center gap-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-500">
            <Rocket className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Activate Your Legal Directory Profile
            </h2>
            <p className="text-default-500 dark:text-default-400 text-sm max-w-md mx-auto leading-relaxed">
              To publish your profile and start receiving retainer requests from
              premium clients, you need to complete a{" "}
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                one-time profile activation fee
              </span>
              .
            </p>
          </div>

          <div className="w-full bg-default-50 dark:bg-[#121212] border border-default-200 dark:border-neutral-800 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1 text-left">
            <div className="flex gap-3 items-center">
              <LuSparkles className="text-amber-500 dark:text-yellow-400 w-5 h-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Lifetime Listing Access
                </p>
                <p className="text-xs text-default-500 dark:text-default-400">
                  No monthly recurring quotas or billing cycles. Pay once, stay
                  verified forever.
                </p>
              </div>
            </div>

            <Link href="/plans" className="w-full sm:w-auto shrink-0">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-white px-5 rounded-xl text-xs h-10 shadow-md hover:opacity-90 transition-opacity">
                Unlock Lifetime Profile
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 bg-content1 border border-default-100 rounded-3xl p-6 sm:p-8 shadow-xl"
        >
          <legend className="text-xl font-bold text-[#0B3A75] dark:text-white">
            Register New Legal Service
          </legend>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            {/* image */}
            <div className="lg:col-span-1 flex flex-col items-center gap-4">
              <Label className="text-sm font-semibold text-default-700">
                Profile Image *
              </Label>
              <div
                className={`relative group cursor-pointer w-32 h-32 rounded-full border-2 ${!logoUrl ? "border-danger" : "border-default-200"}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar className="w-full h-full">
                  {logoUrl ? (
                    <Avatar.Image src={logoUrl} />
                  ) : (
                    <div className="flex bg-default-100 w-full h-full items-center justify-center text-default-400">
                      <TbCloudUpload className="text-3xl" />
                    </div>
                  )}
                </Avatar>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
                ref={fileInputRef}
              />
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="flex flex-col gap-1.5">
                <Label>Professional Name *</Label>
                <Input
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Specialization *</Label>
                <Select
                  placeholder="Select Law Specialization"
                  isRequired
                  selectedKey={specialization}
                  onSelectionChange={(k) => setSpecialization(k as string)}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator>
                      <ChevronDown />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {SPECIALIZATIONS.map((item) => (
                        <ListBox.Item key={item.value} id={item.value}>
                          {item.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Consultation Fee *</Label>
                <TextField>
                  <InputGroup>
                    <InputGroup.Prefix>$</InputGroup.Prefix>
                    <InputGroup.Input
                      required
                      type="number"
                      placeholder="120"
                      value={hourlyFee}
                      onChange={(e) => setHourlyFee(e.target.value)}
                    />
                  </InputGroup>
                </TextField>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Availability Status *</Label>
                <Select
                  isRequired
                  selectedKey={availability}
                  onSelectionChange={(k) => setAvailability(k as string)}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator>
                      <ChevronDown />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Available">Available</ListBox.Item>
                      <ListBox.Item id="Busy">Busy</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* ৩. লোকেশন ফিল্ড ইনপুট ব্লক যোগ করা হলো */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label>Practice Location *</Label>
                <Input
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label>Bio *</Label>
                <TextArea
                  required
                  placeholder="Brief Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <Label>Qualifications Details *</Label>
                <TextArea
                  required
                  placeholder="Credentials Details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-default-100 pt-5 w-full">
            <Button variant="ghost" onPress={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              isDisabled={isLoading || isUploading}
              className="bg-[#1D44B7] text-white font-semibold rounded-xl px-6 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
