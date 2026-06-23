"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  Label,
  Input,
  InputGroup,
  Select,
  ListBox,
  TextArea,
  Avatar,
  TextField,
  Skeleton,
} from "@heroui/react";
import { ChevronDown, ArrowLeft } from "@gravity-ui/icons";
import { TbCloudUpload } from "react-icons/tb";
import { SPECIALIZATIONS } from "../../specializations";
import { updateLegalProfile } from "@/lib/actions/legalProfile";
import toast from "react-hot-toast";

interface ProfileData {
  professionalName: string;
  specialization: string;
  hourlyFee: string;
  availabilityStatus: string;
  location: string;
  bio: string;
  details: string;
  image: string;
  status: string;
}

interface EditFormProps {
  initialData: ProfileData;
  profileId: string;
}

export default function EditLegalProfileForm({
  initialData,
  profileId,
}: EditFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [name, setName] = useState(initialData?.professionalName || "");
  const [specialization, setSpecialization] = useState<string>(
    initialData?.specialization || "",
  );
  const [hourlyFee, setHourlyFee] = useState(initialData?.hourlyFee || "");
  const [availability, setAvailability] = useState<string>(
    initialData?.availabilityStatus || "Available",
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [details, setDetails] = useState(initialData?.details || "");
  const [logoUrl, setLogoUrl] = useState(initialData?.image || "");

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const isUnchanged = useMemo(() => {
    return (
      name === initialData?.professionalName &&
      specialization === initialData?.specialization &&
      hourlyFee === initialData?.hourlyFee &&
      availability === initialData?.availabilityStatus &&
      location === initialData?.location &&
      bio === initialData?.bio &&
      details === initialData?.details &&
      logoUrl === initialData?.image
    );
  }, [
    name,
    specialization,
    hourlyFee,
    availability,
    location,
    bio,
    details,
    logoUrl,
    initialData,
  ]);

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
      console.error(err);
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUnchanged) return;
    setIsLoading(true);

    const updatedPayload = {
      ...initialData,
      professionalName: name,
      specialization: specialization,
      hourlyFee: Number(hourlyFee).toString(),
      availabilityStatus: availability,
      location: location,
      bio: bio,
      details: details,
      image: logoUrl,
    };

    try {
      await updateLegalProfile(profileId, updatedPayload);
      toast.success("Legal profile updated successfully!");
      router.push("/dashboard/lawyer/manage-legal-profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-10 w-36 rounded-xl" />
        <Skeleton className="h-[500px] w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 flex flex-col justify-center">
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

      <Form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 bg-content1 border border-default-100 rounded-3xl p-6 sm:p-8 shadow-xl"
      >
        <legend className="text-xl font-bold text-[#0B3A75] dark:text-white">
          Configure Registered Service Profile
        </legend>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
          {/* Image Block */}
          <div className="lg:col-span-1 flex flex-col items-center gap-4">
            <Label className="text-sm font-semibold text-default-700">
              Profile Image *
            </Label>
            <div
              className="relative group cursor-pointer w-32 h-32 rounded-full border-2 border-default-200 overflow-hidden"
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

          {/* Form Fields */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="flex flex-col gap-1.5">
              <Label>Professional Name *</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Specialization *</Label>
              <Select
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
                    value={hourlyFee}
                    onChange={(e) => setHourlyFee(e.target.value)}
                  />
                </InputGroup>
              </TextField>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Availability Status *</Label>
              <Select
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

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label>Practice Location *</Label>
              <Input
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label>Bio *</Label>
              <TextArea
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label>Qualifications Details *</Label>
              <TextArea
                required
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
            isDisabled={isLoading || isUploading || isUnchanged}
            className={`font-semibold rounded-xl px-6 flex items-center gap-2 ${
              isUnchanged
                ? "bg-default-100 text-default-400 cursor-not-allowed"
                : "bg-[#1D44B7] text-white"
            }`}
          >
            {isLoading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
