"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Avatar,
  Button,
  Modal,
  Surface,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import { ArrowLeft, Gear, Camera, Pencil } from "@gravity-ui/icons";
import { TbCloudUpload } from "react-icons/tb";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { updateUserProfile } from "@/lib/actions/users";

export default function UpdateForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, isPending } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form states matching requirements
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Sync session configurations safely
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
        { method: "POST", body: formData },
      );
      const resData = await response.json();
      if (resData.success && resData.data?.url) {
        setImageUrl(resData.data.url);
        toast.success("Avatar sync completed");
      }
    } catch (err) {
      console.error("ImgBB sync exception:", err);
      toast.error("Failed to host file asset");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!session?.user?.id) {
      toast.error("User payload validation context missing");
      return;
    }

    setIsLoading(true);
    try {
      await updateUserProfile(session.user.id, name, email, imageUrl);
      toast.success("Profile records saved");
      router.refresh();

      // Target native click simulation to close Hero UI uncontrolled stack safely
      const closeBtn = document.getElementById("hero-dismiss-node");
      if (closeBtn) closeBtn.click();
    } catch (err) {
      console.error("Mutation failure trace:", err);
      toast.error("Server cluster synchronization failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const userRole = (session?.user as any)?.role || "Client";

  return (
    <>
      {/* Back button array anchor layout */}
      <div className="mb-8 w-full flex justify-start">
        <Button
          variant="ghost"
          onPress={() => router.back()}
          className="border-neutral-200/80 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-full h-10 px-5 text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md"
        >
          <ArrowLeft className="size-4" />
          Back to Console
        </Button>
      </div>

      {/* Main Showcase Showcase Matrix */}
      <Card className="w-full bg-white/80 dark:bg-zinc-950/80 border border-neutral-200/60 dark:border-neutral-800/50 rounded-[2rem] p-8 md:p-10 shadow-xl backdrop-blur-md flex flex-col gap-8">
        <Card.Header className="flex flex-col sm:flex-row items-center gap-6 border-b border-neutral-100 dark:border-neutral-900/60 pb-8 text-center sm:text-left">
          <div className="relative p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full">
            <Avatar className="w-24 h-24 text-lg font-bold shadow-md">
              {imageUrl ? (
                <Avatar.Image src={imageUrl} alt={name} />
              ) : (
                <Avatar.Fallback>
                  {name ? name.substring(0, 2).toUpperCase() : "US"}
                </Avatar.Fallback>
              )}
            </Avatar>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center sm:justify-start">
              <Card.Title className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {session?.user?.name || "Member Profile"}
              </Card.Title>
              <span className="w-fit mx-auto sm:mx-0 text-[10px] font-bold tracking-widest uppercase bg-neutral-950 text-white dark:bg-white dark:text-black px-2.5 py-0.5 rounded-md">
                {userRole}
              </span>
            </div>
            <Card.Description className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {session?.user?.email}
            </Card.Description>
          </div>
        </Card.Header>

        {/* Informative Display Read-only Slots */}
        <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Profile Name
            </span>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/30">
              {session?.user?.name || "Not Configured"}
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Email Address
            </span>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/30">
              {session?.user?.email || "Not Configured"}
            </p>
          </div>
        </Card.Content>

        {/* Exact uncontrolled implementation stack structure match */}
        <Card.Footer className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-900/60">
          <Modal>
            <Button variant="primary" className={"rounded-lg"}><Pencil/> Update Profile</Button>

            <Modal.Backdrop>
              <Modal.Container placement="auto">
                <Modal.Dialog className="sm:max-w-md">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white">
                      <Gear className="size-5" />
                    </Modal.Icon>
                    <Modal.Heading>Account Settings</Modal.Heading>
                    <p className="mt-1.5 text-sm leading-5 text-muted dark:text-neutral-400">
                      Modify your professional system identifiers, email nodes
                      and real-time avatar assets.
                    </p>
                  </Modal.Header>

                  <Modal.Body className="p-6">
                    <Surface
                      variant="default"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Premium Asset Configuration Matrix */}
                        <div className="flex flex-col items-center gap-3 w-full bg-neutral-50 dark:bg-neutral-900/30 p-5 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-inner">
                          <div
                            className="relative group cursor-pointer w-20 h-20 rounded-full border-2 border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-md"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Avatar className="w-full h-full text-xs">
                              {imageUrl ? (
                                <Avatar.Image
                                  src={imageUrl}
                                  alt="Configuration Preview"
                                />
                              ) : (
                                <div className="flex w-full h-full items-center justify-center text-neutral-400 bg-neutral-100 dark:bg-neutral-900">
                                  <TbCloudUpload className="text-xl" />
                                </div>
                              )}
                            </Avatar>
                            <div className="absolute inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Camera className="text-white size-4" />
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                          />
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wide">
                            Click to change profile graphic
                          </span>
                          {isUploading && (
                            <p className="text-[10px] text-neutral-950 dark:text-white font-mono animate-pulse">
                              Uploading to asset ledger...
                            </p>
                          )}
                        </div>

                        <TextField
                          className="w-full"
                          name="name"
                          type="text"
                          variant="secondary"
                        >
                          <Label>Name</Label>
                          <Input
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </TextField>

                        <TextField
                          className="w-full"
                          name="email"
                          type="email"
                          variant="secondary"
                        >
                          <Label>Email</Label>
                          <Input
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </TextField>
                      </div>
                    </Surface>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      id="hero-dismiss-node"
                      slot="close"
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      isDisabled={isLoading || isUploading}
                      onPress={handleProfileUpdate}
                      className="bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-neutral-400 border-t-white dark:border-t-black rounded-full animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        </Card.Footer>
      </Card>
    </>
  );
}
