import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ShortlistLink } from "./ShortlistLink";
import { navigation } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav
          aria-label="Main"
          className="hidden items-center gap-7 text-[0.95rem] font-medium lg:flex"
        >
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ShortlistLink />
          <ButtonLink href="/build" variant="accent" size="sm">
            <Icon name="plan" size={18} />
            <span className="max-sm:hidden">Design your home</span>
            <span className="sm:hidden">Design</span>
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
