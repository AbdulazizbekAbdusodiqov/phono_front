import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

const rusNamesMap: Record<string, string> = {
  profile: "Профиль",
  edit: "Мои объявления",
};

const Breadcrumb = () => {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { name: "Главная", href: "/" },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const name =
        rusNamesMap[segment.toLowerCase()] ||
        decodeURIComponent(segment)
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

      return { name, href };
    }),
  ];

  return (
    <nav className={`${styles.breadcrumb} ${styles.container}`}>
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span key={index} className={styles.item}>
            {!isLast ? (
              <>
                <Link href={crumb.href} className={styles.link}>
                  {crumb.name}
                </Link>
                <span className={styles.arrow}>→</span>
              </>
            ) : (
              <span className={styles.current}>{crumb.name}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
