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
} from "@heroui/react";
import { ChevronDown, Camera, ArrowLeft } from "@gravity-ui/icons";
import { TbCloudUpload } from "react-icons/tb";
import { SPECIALIZATIONS } from "../specializations";
import { createLegalProfile } from "@/lib/core/actions/legalProfile";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function NewLegalProfileFormPage() {
  const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
   const { data: session, isPending } = useSession();
    // console.log(session.user)

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // States
  const [name, setName] = useState("");
  const [hourlyFee, setHourlyFee] = useState("");
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
      alert("Profile Image Upload is required!");
      return;
    }
    setIsLoading(true);

    const legalPayload = {
      professionalName: name,
      specialization: specialization,
      hourlyFee: Number(hourlyFee).toString(),
      availabilityStatus: availability,
      bio: bio,
      details: details,
      image: logoUrl,
      status: "pending",
      lawyerId: session!.user.id, 
      lawyerEmail: session!.user.email,
    };
      console.log(legalPayload)

    try {
        await createLegalProfile(legalPayload as any);
        toast.success("Legal profile created successfully!")
      router.push("/dashboard/lawyer/manage-legal-profile");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* back button */}
      <div className="mb-6">
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
        className="flex flex-col gap-6 bg-content1 border border-default-100 rounded-3xl p-6 sm:p-8 shadow-xl"
      >
        <legend className="text-xl font-bold text-[#0B3A75]">
          Register New Legal Service
        </legend>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* image*/}
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
              required
              className="hidden"
              onChange={handleLogoUpload}
              ref={fileInputRef}
            />
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <div className="flex justify-end gap-3 border-t border-default-100 pt-5">
          <Button variant="ghost" onPress={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            isDisabled={isUploading}
            className="bg-[#1D44B7] text-white"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}
