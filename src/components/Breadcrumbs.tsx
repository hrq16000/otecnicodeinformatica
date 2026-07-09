import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const allItems = [{ label: "Início", href: "/" }, ...items];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://tecnico.curitiba.br${item.href}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <nav
        aria-label="Breadcrumb"
        className="bg-muted/50 border-b border-border"
      >
        <div className="container mx-auto px-4 py-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {allItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                )}
                {item.href && index < allItems.length - 1 ? (
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {index === 0 && <Home className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    {index === 0 && <Home className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
