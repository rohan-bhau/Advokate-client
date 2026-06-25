"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";

import { ArrowRightFromSquare, CirclePlus, Gear, House, Persons } from "@gravity-ui/icons";
import { Avatar, Button, Drawer,  Separator } from "@heroui/react";
import Image from "next/image";
import logo from "@/assets/nav-logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Bars, Magnifier, Sun, Moon } from "@gravity-ui/icons";
import Link from "next/link";
import { VscLaw } from "react-icons/vsc";
import { authClient, useSession } from "@/lib/auth-client";
import { RxAvatar, RxDashboard } from "react-icons/rx";
import { AlertDialog } from "@heroui/react";
import toast from "react-hot-toast";
import { CgOrganisation } from "react-icons/cg";
import { FaRegCreditCard } from "react-icons/fa";
import { MdHistory, MdOutlineAnalytics } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { BiComment } from "react-icons/bi";


export function MobileDrawer() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  //   const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
const user = session?.user ? (session.user as any) : undefined;
//   console.log(user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : "light";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };
  const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
    label: string;
  }[] = [
    { icon: House, href: "/", label: "Home" },
    { icon: VscLaw, href: "/browse-lawyer", label: "Browse Lawyers" },
        ];
    
  //   if (user) {
  //       navItems.push({
  //         icon: RxDashboard,
  //         href: "/dashboard",
  //         label: "Dashboard",
  //       });
  // }


if (user?.email) {
  const userRole = user.role || "client";
  if (userRole === "lawyer") {
    navItems.push(
      {
        icon: RxDashboard,
        href: "/dashboard/lawyer",
        label: "Overview",
      },
      {
        icon: Persons,
        href: "/dashboard/lawyer/manage-legal-profile",
        label: "Manage Legal Profile",
      },
      {
        icon: CirclePlus,
        href: "/dashboard/lawyer/manage-legal-profile/new-legal-profile",
        label: "Add New Profile",
      },
      {
        icon: LuHistory,
        href: "/dashboard/lawyer/hiring-history",
        label: "Hiring History",
      },
      {
        icon: FaRegCreditCard,
        href: "/dashboard/lawyer/transactions",
        label: "Transactions",
      },
    );
  } else if (userRole === "client") {
    navItems.push(
      {
        icon: RxDashboard,
        href: "/dashboard/client",
        label: "Overview",
      },
      {
        icon: MdHistory,
        href: "/dashboard/client/hiring-history",
        label: "Hiring History",
      },
      {
        icon: BiComment,
        href: "/dashboard/client/reviews",
        label: "Reviews",
      },
      {
        icon: FaRegCreditCard,
        href: "/dashboard/client/transactions",
        label: "Transactions",
      },
      {
        icon: RxAvatar,
        href: "/dashboard/client/update-profile",
        label: "Update Profile",
      },
    );
  } else if (userRole === "admin") {
    navItems.push(
      {
        icon: RxDashboard,
        href: "/dashboard/admin",
        label: "Admin Overview",
      },
      {
        icon: Persons,
        href: "/dashboard/admin/manage-users",
        label: "Manage Users",
      },
      {
        icon: CgOrganisation,
        href: "/dashboard/admin/legal-profiles",
        label: "Legal Profiles",
      },
      {
        icon: FaRegCreditCard,
        href: "/dashboard/admin/all-transactions",
        label: "Platform Earnings",
      },
      {
        icon: MdOutlineAnalytics,
        href: "/dashboard/admin/analytics",
        label: "Analytics",
      },
    );
  }
}

    const handleSignOut = async () => {
      try {
        await authClient.signOut();
          router.push("/login");
          window.location.reload()
          // router.refresh();
          toast.success("Logout successfull")
      } catch (err) {
        console.error("Sign out routine variance caught:", err);
      }
    };
 
  return (
    <Drawer>
      <Button variant="secondary">
        <Bars />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <div>
              <Button
                isIconOnly
                variant="outline"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="text-default-500 rounded-full border-default-200 h-7 w-7"
              >
                {currentTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Drawer.CloseTrigger />
            </div>
            <Drawer.Header>
              <Drawer.Heading>
                <div className="flex items-center justify-between w-full ">
                  <div className="flex items-center gap-2">
                    <Image
                      src={logo}
                      alt="nav-logo"
                      width={60}
                      height={50}
                      className="object-contain"
                    />
                    <span className="font-bold text-xl tracking-tight text-[#0B3A75] dark:text-white">
                      Advokate
                    </span>
                  </div>
                </div>
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col min-h-[calc(100vh-160px)]">
                <div>
                  <Separator
                    orientation="horizontal"
                    className="px-6 text-default-100 dark:text-white mb-5"
                  />
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          href={item.href}
                          key={item.label}
                          className={`flex items-center gap-3 w-full h-12 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                            isActive
                              ? "bg-blue-50/70 text-[#1D44B7]  border-l-3 border-[#1A73E8] dark:bg-blue-500/10 dark:text-blue-400 shadow-sm"
                              : "text-[#5C6E85] dark:text-default-400 hover:bg-blue-50/70 dark:hover:bg-blue-500/10 hover:text-[#1D44B7] dark:hover:text-blue-400"
                          }`}
                        >
                          <item.icon className="size-5 text-muted" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="mt-auto bg-default-50 dark:bg-default-100/50 rounded-2xl p-4 flex flex-col gap-4">
                  {user ? (
                    <div className="flex items-center justify-between w-full">
                      {/* Left Side: Consolidated Info Sub-wrapper */}
                      <div className="flex items-center gap-3 max-w-[calc(100%-60px)]">
                        <Avatar className="w-10 h-10 shrink-0">
                          <Avatar.Image
                            alt={user.name || "User Profile"}
                            src={user.image || undefined}
                          />
                          <Avatar.Fallback>
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((n:string) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)
                              : "JD"}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-col gap-0 overflow-hidden">
                          <p className="text-sm leading-5 font-semibold text-foreground truncate">
                            Hi, {user.name ? user.name.split(" ")[0] : "User"}
                          </p>
                          <p className="text-xs leading-none text-default-400 truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Pinned Alert Dialog Trigger block */}
                      <div className="shrink-0">
                        <AlertDialog>
                          <Button
                            isIconOnly
                            variant="danger"
                            className="w-9 h-9 min-w-9 rounded-xl"
                          >
                            <ArrowRightFromSquare className="size-4 text-white" />
                          </Button>
                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-[400px]">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                  <AlertDialog.Icon status="danger" />
                                  <AlertDialog.Heading>
                                    Are you sure you want to log out?
                                  </AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Footer>
                                  <Button slot="close" variant="tertiary">
                                    Cancel
                                  </Button>
                                  {/* logout button*/}
                                  <Button
                                    slot="close"
                                    variant="danger"
                                    onClick={handleSignOut}
                                  >
                                    Logout
                                  </Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-full h-11 rounded-xl font-semibold bg-[#1D44B7] text-white active:scale-[0.98]"
                      onPress={() => {
                        router.push("/login");
                      }}
                    >
                      Login/Register
                    </Button>
                  )}
                </div>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
