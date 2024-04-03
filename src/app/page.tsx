"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChevronRightIcon,
  CursorArrowRaysIcon,
  DocumentCheckIcon,
  PencilIcon,
  Square2StackIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

let NAVS = [
  {
    name: "Dashboard",
    Icon: ChartBarIcon,
  },
  {
    name: "Project",
    Icon: Square2StackIcon,
  },
  {
    name: "Tasks",
    Icon: DocumentCheckIcon,
  },
  {
    name: "Reporting",
    Icon: ChartPieIcon,
  },
  {
    name: "Users",
    Icon: UsersIcon,
  },
];

let PROJECTS = [
  {
    name: "Apple Vision",
    Icon: (
      <div className="h-3 w-3 bg-gradient-to-br from-pink-400 to-fuchsia-700 rounded-full" />
    ),
  },
  {
    name: "Audi",
    Icon: (
      <div className="h-3 w-3 bg-gradient-to-br from-orange-400 to-yellow-700 rounded-full" />
    ),
  },
  {
    name: "Design Engineer",
    Icon: (
      <div className="h-3 w-3 bg-gradient-to-br from-red-400 to-rose-700 rounded-full" />
    ),
  },
  {
    name: "Wedding Planner",
    Icon: (
      <div className="h-3 w-3 bg-gradient-to-br from-blue-400 to-cyan-700 rounded-full" />
    ),
  },
  {
    name: "Freelancing",
    Icon: (
      <div className="h-3 w-3 bg-gradient-to-br from-indigo-400 to-violet-700 rounded-full" />
    ),
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen">
      <Navigation />
      <section className="flex flex-col p-10 ml-20 w-full gap-5">
        <div>
          <h1 className="font-medium">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <div className="w-full h-52 border rounded-lg bg-card border-border" />
        <div className="flex gap-5">
          <div className="w-full h-52 border rounded-lg bg-card border-border" />
          <div className="w-full h-52 border rounded-lg bg-card border-border" />
        </div>
      </section>
    </main>
  );
}

let containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
};

function Navigation() {
  let [active, setActive] = useState<string | null>("Dashboard");
  let [selectedProject, setSelectedProject] = useState<string | null>(null);
  let [isOpen, setOpen] = useState(false);
  let containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  return (
    <div>
      <motion.nav
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className="bg-card flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow border-r border-border"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-700 rounded-full"></div>
          <button
            className="p-2 rounded-full flex outline-none focus-visible:bg-accent hover:bg-accent transition-colors"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6 stroke-foreground"
            >
              <motion.path
                initial={{ rotate: isOpen ? 180 : 0 }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {NAVS.map(({ name, Icon }) => (
            <div key={name} className="relative">
              {active === name && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-accent rounded-lg text-foreground"
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.4,
                  }}
                />
              )}
              <a
                href="#"
                className={cn(
                  "relative outline-none z-10 flex p-2 rounded-lg cursor-pointer place-items-center gap-3 transition-colors",
                  active === name
                    ? "stroke-foreground text-foreground"
                    : "text-muted-foreground stroke-muted-foreground"
                )}
                onMouseOver={() => setActive(name)}
                onMouseLeave={() => setActive(name)}
                onFocus={() => setActive(name)}
                tabIndex={0}
              >
                <Icon className="stroke-inherit min-w-6 w-6" />
                <p className="text-inherit overflow-clip whitespace-nowrap ">
                  {name}
                </p>
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {PROJECTS.map(({ name, Icon }) => (
            <div key={name} className="relative">
              {selectedProject === name && (
                <motion.div
                  layoutId="active-project-nav"
                  className="absolute inset-0 bg-accent rounded-lg text-foreground"
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 0.4,
                  }}
                />
              )}
              <a
                href="#"
                className={cn(
                  "relative z-10 flex p-2 rounded-lg cursor-pointer place-items-center gap-3 transition-colors",
                  selectedProject === name
                    ? "stroke-foreground text-foreground"
                    : "text-muted-foreground stroke-muted-foreground"
                )}
                onClick={() => setSelectedProject(name)}
                tabIndex={0}
              >
                <div className="w-fit ml-1.5 aspect-square">{Icon}</div>
                <div className="flex justify-between overflow-clip w-full place-items-center">
                  <p className="truncate whitespace-nowrap">{name}</p>
                  <ChevronRightIcon className="stroke-inherit min-w-6 w-6" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && (
          <ProjectNavigation
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

let projectNavigationVariants = {
  close: {
    x: -300,
    opacity: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
  open: (isOpen: boolean) => ({
    x: 0,
    opacity: 1,
    left: isOpen ? "16rem" : "5rem",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  }),
};

let PROJECT_NAVS = [
  {
    name: "Progress",
    Icon: ArrowTrendingUpIcon,
  },
  {
    name: "Team Members",
    Icon: UserGroupIcon,
  },
  {
    name: "In Review",
    Icon: PencilIcon,
  },
  {
    name: "In Progress",
    Icon: BoltIcon,
  },
  {
    name: "Up Next",
    Icon: CursorArrowRaysIcon,
  },
  {
    name: "Project Settings",
    Icon: AdjustmentsHorizontalIcon,
  },
];

function ProjectNavigation({
  isOpen,
  selectedProject,
  setSelectedProject,
}: {
  selectedProject: string | null;
  isOpen: boolean;
  setSelectedProject: (project: string | null) => void;
}) {
  let [key, setKey] = useState(0);
  let [project, setProject] = useState<string | null>(null);

  // Note: inspired by Dynamic Footer Widget, @see https://www.uilabs.dev/
  let variants = {
    close: {
      y: "-42px",
      transition: {
        duration: 0.4,
      },
    },
    open: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
        delay: 0.15,
      },
    },
  };

  useEffect(() => {
    setProject(selectedProject);
    setKey((prev) => prev + 1);
  }, [selectedProject]);

  return (
    <motion.nav
      variants={projectNavigationVariants}
      initial="close"
      animate="open"
      exit="close"
      custom={isOpen}
      className="h-full flex flex-col absolute gap-8 w-64 bg-card border-r border-border p-5"
    >
      <div className="flex flex-row w-full place-items-center justify-between">
        <motion.div
          key={key}
          variants={variants}
          initial="close"
          animate="open"
          exit="exit"
        >
          <h2 className=" font-medium">{project}</h2>
        </motion.div>
        <button
          className="focus-visible:bg-accent hover:bg-accent rounded-full p-0.5"
          onClick={() => setSelectedProject(null)}
        >
          <XMarkIcon className="stroke-foreground w-6 h-6" />
        </button>
      </div>
      <Input type="text" placeholder="Search..." className="px-2 py-1 " />

      <div className="flex flex-col gap-1">
        {PROJECT_NAVS.map(({ name, Icon }) => (
          <div key={name} className="relative">
            {selectedProject === name && (
              <motion.div
                layoutId="active-project-nav-child"
                className="absolute inset-0 bg-accent rounded-lg text-foreground"
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 0.4,
                }}
              />
            )}
            <a
              href="#"
              className={cn(
                "relative z-10 flex p-2 rounded-lg cursor-pointer place-items-center gap-3 transition-colors",
                selectedProject === name
                  ? "stroke-foreground text-foreground"
                  : "text-muted-foreground stroke-muted-foreground"
              )}
              tabIndex={0}
            >
              <Icon className="stroke-inherit min-w-6 w-6" />
              <p className="text-inherit overflow-clip whitespace-nowrap ">
                {name}
              </p>
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h2 className=" ">Team Members</h2>

        <a
          href="#"
          className="rounded-lg flex flex-row gap-3 place-items-center"
        >
          <UserIcon className="w-6 h-6 p-1 rounded-full bg-rose-200/70 stroke-2 stroke-rose-800" />
          <p className="text-muted-foreground">Emma Watson</p>
        </a>
        <a
          href="#"
          className="rounded-lg flex flex-row gap-3 place-items-center"
        >
          <UserIcon className="w-6 h-6 p-1 rounded-full bg-lime-200/70 stroke-2 stroke-lime-800" />
          <p className="text-muted-foreground">Lana Del Rey</p>
        </a>
        <a
          href="#"
          className="rounded-lg flex flex-row gap-3 place-items-center"
        >
          <UserIcon className="w-6 h-6 p-1 rounded-full bg-cyan-200/70 stroke-2 stroke-cyan-800" />
          <p className="text-muted-foreground">Saul Goodman</p>
        </a>
      </div>
    </motion.nav>
  );
}
