/* @ds-bundle: {"format":4,"namespace":"RevelioDesignSystem_a31b32","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"ArtifactRow","sourcePath":"components/data/ArtifactRow.jsx"},{"name":"MetricBar","sourcePath":"components/data/MetricBar.jsx"},{"name":"RiskItem","sourcePath":"components/data/RiskItem.jsx"},{"name":"Consent","sourcePath":"components/forms/Consent.jsx"},{"name":"ContactForm","sourcePath":"components/forms/ContactForm.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Container","sourcePath":"components/layout/Container.jsx"},{"name":"Marquee","sourcePath":"components/layout/Marquee.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"},{"name":"StepList","sourcePath":"components/layout/StepList.jsx"},{"name":"ArticleCard","sourcePath":"components/surfaces/ArticleCard.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"CaseCard","sourcePath":"components/surfaces/CaseCard.jsx"},{"name":"ServiceCard","sourcePath":"components/surfaces/ServiceCard.jsx"},{"name":"StatBlock","sourcePath":"components/surfaces/StatBlock.jsx"},{"name":"TeamCard","sourcePath":"components/surfaces/TeamCard.jsx"}],"sourceHashes":{"components/core/Button.jsx":"fe9f35a5d713","components/core/Chip.jsx":"7f100bfa79cf","components/core/SectionLabel.jsx":"44fc48fa41c4","components/core/Wordmark.jsx":"5eba9c84fa5d","components/data/ArtifactRow.jsx":"9ae2d9046a44","components/data/MetricBar.jsx":"d8278d18508b","components/data/RiskItem.jsx":"9fd3719e4fcb","components/forms/Consent.jsx":"f6e44d685ec2","components/forms/ContactForm.jsx":"495908166046","components/forms/Field.jsx":"a62c8f96f9c1","components/layout/Container.jsx":"5d4895dfa1f6","components/layout/Marquee.jsx":"f32ba9584dae","components/layout/SectionHeading.jsx":"e2c6dfc26dbb","components/layout/StepList.jsx":"7edf03a3ba6c","components/surfaces/ArticleCard.jsx":"88d29eb0b661","components/surfaces/Card.jsx":"4d7dc5b2e51a","components/surfaces/CaseCard.jsx":"80fd2574ab22","components/surfaces/ServiceCard.jsx":"ca2c0b28a07e","components/surfaces/StatBlock.jsx":"fabce2f82cda","components/surfaces/TeamCard.jsx":"6fe5bbcc160c","ui_kits/website/AiEvaluationScreen.jsx":"6246f0d7c55e","ui_kits/website/App.jsx":"a46c3601c225","ui_kits/website/Chrome.jsx":"ea701841c2ff","ui_kits/website/ConsultingScreen.jsx":"f98904a97485","ui_kits/website/HomeScreen.jsx":"928d96c8dec3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RevelioDesignSystem_a31b32 = window.RevelioDesignSystem_a31b32 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-mono)",
  borderRadius: "var(--radius-lg)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background-color var(--dur-hover), color var(--dur-hover), border-color var(--dur-hover)",
  border: "1px solid transparent",
  lineHeight: 1,
  whiteSpace: "nowrap"
};
const sizes = {
  sm: {
    padding: "0.625rem 1.125rem",
    fontSize: "var(--text-mono-sm)"
  },
  md: {
    padding: "0.875rem 1.75rem",
    fontSize: "var(--text-mono)"
  },
  lg: {
    padding: "1.0625rem 2.25rem",
    fontSize: "var(--text-mono)"
  }
};
const variants = {
  primary: {
    rest: {
      background: "var(--accent)",
      color: "var(--accent-foreground)",
      borderColor: "var(--accent)"
    },
    hover: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      borderColor: "var(--primary)"
    }
  },
  secondary: {
    rest: {
      background: "var(--secondary)",
      color: "var(--primary)",
      borderColor: "var(--border)"
    },
    hover: {
      background: "var(--muted)",
      color: "var(--accent)",
      borderColor: "var(--border-strong)"
    }
  },
  ghost: {
    rest: {
      background: "transparent",
      color: "var(--muted-foreground)",
      borderColor: "transparent"
    },
    hover: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "transparent"
    }
  },
  outline: {
    rest: {
      background: "transparent",
      color: "var(--primary)",
      borderColor: "var(--border-strong)"
    },
    hover: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "var(--accent)"
    }
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  fullWidth = false,
  trailing,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const css = {
    ...base,
    ...(sizes[size] || sizes.md),
    ...v.rest,
    ...(hover && !disabled ? v.hover : null),
    ...(fullWidth ? {
      width: "100%"
    } : null),
    ...(disabled ? {
      opacity: 0.45,
      pointerEvents: "none"
    } : null),
    ...style
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    onClick: onClick,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }), children, trailing ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      letterSpacing: 0
    }
  }, trailing) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Chip({
  children,
  tone = "muted",
  size = "md",
  style,
  ...rest
}) {
  const tones = {
    muted: {
      background: "var(--secondary)",
      color: "var(--muted-foreground)",
      borderColor: "transparent"
    },
    accent: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "var(--accent)"
    },
    ink: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      borderColor: "var(--primary)"
    },
    outline: {
      background: "transparent",
      color: "var(--muted-foreground)",
      borderColor: "var(--border)"
    }
  };
  const pad = size === "sm" ? "0.25rem 0.625rem" : "0.375rem 0.875rem";
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-block",
      borderRadius: "var(--radius-full)",
      border: "1px solid",
      padding: pad,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono-wide)",
      lineHeight: 1.4,
      ...tones[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionLabel({
  children,
  tone = "muted",
  style,
  ...rest
}) {
  const color = tone === "accent" ? "var(--accent)" : tone === "ink" ? "var(--primary)" : "var(--muted-foreground)";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono-wide)",
      color,
      ...style
    }
  }), "[\xA0", children, "\xA0]");
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* No logo binary was supplied with the source spec, so the mark is set in type:
   Inter Tight, black, uppercase, tight tracking — matching brand headings. */
function Wordmark({
  size = 20,
  tone = "ink",
  locale = "ru",
  style,
  ...rest
}) {
  const color = tone === "paper" ? "var(--background)" : tone === "accent" ? "var(--accent)" : "var(--foreground)";
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "-0.03em",
      textTransform: "uppercase",
      color,
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3em",
      ...style
    }
  }), locale === "ru" ? "Ревелио" : "Revelio", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "0.28em",
      height: "0.28em",
      borderRadius: 999,
      background: "var(--accent)"
    }
  }));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/data/ArtifactRow.jsx
try { (() => {
function ArtifactRow({
  title,
  format,
  price,
  action = "Запросить шаблон",
  onAction
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto auto",
      gap: "1.5rem",
      alignItems: "center",
      padding: "1rem 0",
      borderTop: "1px solid var(--border)",
      transition: "color var(--dur-hover)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: hover ? "var(--accent)" : "var(--foreground)",
      transition: "color var(--dur-hover)"
    }
  }, title), format ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, format) : null), /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: "none",
      border: 0,
      padding: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, action), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-body)",
      whiteSpace: "nowrap"
    }
  }, price));
}
Object.assign(__ds_scope, { ArtifactRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ArtifactRow.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricBar.jsx
try { (() => {
function MetricBar({
  label,
  percent = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      paddingBlock: "0.75rem",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "1rem",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-sm)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)"
    }
  }, percent, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "var(--secondary)",
      borderRadius: "var(--radius-full)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: percent + "%",
      height: "100%",
      background: "var(--accent)"
    }
  })));
}
Object.assign(__ds_scope, { MetricBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricBar.jsx", error: String((e && e.message) || e) }); }

// components/data/RiskItem.jsx
try { (() => {
function RiskItem({
  title,
  impacts = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      paddingBlock: "0.875rem",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-sm)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem"
    }
  }, impacts.map(im => /*#__PURE__*/React.createElement("span", {
    key: im.label,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, im.label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--destructive)"
    }
  }, im.value)))));
}
Object.assign(__ds_scope, { RiskItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RiskItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/Consent.jsx
try { (() => {
function Consent({
  checked = false,
  onChange,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "0.75rem",
      alignItems: "start",
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": checked,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      marginTop: 3,
      borderRadius: "var(--radius-sm)",
      border: "1px solid " + (checked ? "var(--accent)" : "var(--input)"),
      background: checked ? "var(--accent)" : "transparent",
      color: "var(--accent-foreground)",
      display: "grid",
      placeItems: "center",
      fontSize: 11,
      lineHeight: 1,
      transition: "background-color var(--dur-hover), border-color var(--dur-hover)"
    }
  }, checked ? "✓" : ""), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Consent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Consent.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
const shell = {
  width: "100%",
  background: "var(--card)",
  color: "var(--foreground)",
  border: "1px solid var(--input)",
  borderRadius: "var(--radius-md)",
  padding: "0.8125rem 1rem",
  font: "inherit",
  fontSize: "var(--text-body-sm)",
  letterSpacing: "var(--tracking-body)",
  outline: "none",
  transition: "border-color var(--dur-hover)"
};
function Field({
  label,
  name,
  type = "text",
  placeholder,
  rows,
  required = false,
  value,
  onChange
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = rows ? "textarea" : "input";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, " *") : null), /*#__PURE__*/React.createElement(Tag, {
    name: name,
    type: rows ? undefined : type,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...shell,
      ...(focus ? {
        borderColor: "var(--ring)"
      } : null),
      ...(rows ? {
        resize: "vertical",
        lineHeight: 1.55
      } : null)
    }
  }));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/ContactForm.jsx
try { (() => {
function ContactForm({
  onSubmit
}) {
  const [ok, setOk] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      onSubmit && onSubmit();
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "\u0418\u043C\u044F",
    required: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "Email",
    type: "email",
    required: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
    type: "tel"
  }), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "\u0417\u0430\u0434\u0430\u0447\u0430",
    rows: 4
  }), /*#__PURE__*/React.createElement(__ds_scope.Consent, {
    checked: ok,
    onChange: setOk
  }, "\u042F \u0434\u0430\u044E \u0441\u0432\u043E\u0451 ", /*#__PURE__*/React.createElement("a", {
    href: "#consent"
  }, "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435"), " \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 ", /*#__PURE__*/React.createElement("a", {
    href: "#policy"
  }, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    disabled: !ok,
    style: {
      alignSelf: "flex-start"
    }
  }, sent ? "Отправлено" : "Отправить"));
}
Object.assign(__ds_scope, { ContactForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ContactForm.jsx", error: String((e && e.message) || e) }); }

// components/layout/Container.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Container({
  children,
  as = "div",
  style,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    style: {
      marginInline: "auto",
      maxWidth: "var(--container-max)",
      width: "100%",
      paddingInline: "var(--container-pad-sm)",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Container });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Container.jsx", error: String((e && e.message) || e) }); }

// components/layout/Marquee.jsx
try { (() => {
function Marquee({
  items = [],
  style
}) {
  const row = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderBlock: "1px solid var(--border)",
      paddingBlock: "1.25rem",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "animate-marquee",
    style: {
      display: "flex",
      gap: "3rem",
      width: "max-content"
    }
  }, row.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "1.125rem",
      letterSpacing: "-0.02em",
      color: "var(--muted-foreground)",
      whiteSpace: "nowrap"
    }
  }, it))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
function SectionHeading({
  label,
  title,
  lead,
  aside,
  size = "md"
}) {
  const fs = size === "lg" ? "var(--text-display-3)" : "var(--text-h2)";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "1.5rem",
      marginBottom: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxWidth: "46rem"
    }
  }, label ? /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, null, label) : null, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: fs,
      lineHeight: "var(--leading-display)",
      letterSpacing: "-0.02em"
    }
  }, title) : null, lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)"
    }
  }, lead) : null), aside ? /*#__PURE__*/React.createElement("div", null, aside) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/layout/StepList.jsx
try { (() => {
function StepList({
  steps = [],
  variant = "detailed"
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: 0
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "3.25rem 1fr",
      gap: "1rem",
      paddingBlock: "1.125rem",
      borderTop: i === 0 ? "none" : "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)",
      paddingTop: "0.125rem"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-h4)",
      letterSpacing: "-0.02em"
    }
  }, s.title), s.meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, s.meta) : null), variant === "detailed" && s.description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, s.description) : null))));
}
Object.assign(__ds_scope, { StepList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StepList.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hairline surface. Covers sit flush to the card edge — no inner padding for art. */
function Card({
  children,
  radius = "2xl",
  interactive = false,
  pad = true,
  tone = "card",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: tone === "muted" ? "var(--secondary)" : tone === "ink" ? "var(--primary)" : "var(--card)",
      color: tone === "ink" ? "var(--primary-foreground)" : "var(--card-foreground)",
      border: "1px solid",
      borderColor: interactive && hover ? "var(--border-strong)" : "var(--border)",
      borderRadius: `var(--radius-${radius})`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "border-color var(--dur-hover), background-color var(--dur-hover)",
      ...(pad ? {
        padding: "1.5rem"
      } : null),
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ArticleCard.jsx
try { (() => {
function ArticleCard({
  kind,
  year,
  title,
  excerpt,
  cover,
  links = []
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    pad: false
  }, cover ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--secondary)",
      aspectRatio: "16 / 9"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.625rem",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", null, kind), year ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, year) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-h4)",
      lineHeight: 1.25,
      letterSpacing: "-0.02em",
      textTransform: "none"
    }
  }, title), excerpt ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, excerpt) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1rem",
      marginTop: "auto",
      paddingTop: "0.75rem"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)"
    }
  }, l.label)))));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/CaseCard.jsx
try { (() => {
function CaseCard({
  glyph,
  category,
  title,
  description,
  cover,
  onClick
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    pad: false,
    onClick: onClick,
    style: {
      cursor: onClick ? "pointer" : "default"
    }
  }, cover ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--secondary)",
      aspectRatio: "16 / 10",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, glyph ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "0.9rem",
      letterSpacing: 0
    }
  }, glyph) : null, category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-h4)",
      lineHeight: 1.25,
      letterSpacing: "-0.02em",
      textTransform: "none"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, description) : null));
}
Object.assign(__ds_scope, { CaseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/CaseCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ServiceCard.jsx
try { (() => {
function ServiceCard({
  glyph,
  title,
  price,
  unit,
  lead,
  bullets = [],
  chips = [],
  cta,
  featured = false
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    radius: "2xl",
    style: featured ? {
      borderColor: "var(--accent)"
    } : null
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      flex: 1
    }
  }, glyph ? /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      fontSize: "1.5rem",
      lineHeight: 1
    }
  }, glyph) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h3)",
      letterSpacing: "-0.02em",
      textTransform: "none"
    }
  }, title), price ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "0.5rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      color: "var(--accent)"
    }
  }, price), unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, unit) : null) : null, lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, lead) : null, bullets.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: "0.5rem"
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "0.625rem",
      fontSize: "var(--text-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--accent)"
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", null, b)))) : null, chips.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.375rem"
    }
  }, chips.map(c => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: c,
    size: "sm"
  }, c))) : null, cta ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: featured ? "primary" : "secondary",
    size: "sm"
  }, cta)) : null));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatBlock.jsx
try { (() => {
function StatBlock({
  value,
  label,
  align = "left"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 900,
      fontSize: "2rem",
      lineHeight: 1.04,
      letterSpacing: "-0.03em"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/TeamCard.jsx
try { (() => {
function TeamCard({
  name,
  role,
  bio,
  photo,
  tags = []
}) {
  const initials = (name || "").trim().slice(0, 1).toUpperCase();
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    interactive: true,
    pad: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4 / 5",
      background: "var(--secondary)",
      display: "grid",
      placeItems: "center"
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 900,
      fontSize: "2.5rem",
      color: "var(--muted-foreground)"
    }
  }, initials)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      letterSpacing: "-0.02em",
      textTransform: "none"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)"
    }
  }, role), bio ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      lineHeight: 1.55
    }
  }, bio) : null, tags.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.3125rem",
      marginTop: "0.25rem"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: t,
    size: "sm"
  }, t))) : null));
}
Object.assign(__ds_scope, { TeamCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/TeamCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AiEvaluationScreen.jsx
try { (() => {
const {
  Container,
  SectionHeading,
  SectionLabel,
  Button,
  Chip,
  Card,
  StepList,
  MetricBar,
  RiskItem
} = window.RevelioDesignSystem_a31b32;
const ONBOARD = [["01", "Загрузка файла", "Загрузи файлы требований/ФТ/ТЗ или описание проекта"], ["02", "Контакты для результата", "Дай контакты куда тебе придет результат"], ["03", "Ответы на вопросы", "Продукт задаст тебе вопросы — ответь на них"], ["04", "Оценка на почте с приватным кодом", "Получи код на почту для работы с результатом оценки"]];
const DIMS = [["Предметная область", "Каков опыт главного ответственного?"], ["Декомпозиция", "На какие задачи и слои абстракции раскладывается проект?"], ["Оценка", "Что и как конкретно будем делать? Какие драйверы трудозатрат?"], ["Риски", "Что сорвёт наши планы?"], ["Ограничения", "Что не входит в скоуп, но кому-то придётся сделать?"], ["Критический путь", "Какие зависимости и последовательности есть на плане?"], ["Взаимосвязи", "Что лежит «до», что «после»?"], ["Допущения", "Где мы ощущаем пробелы? Их цена?"]];
const ERRORS = [["Ответственный и его знания", [["Не разложить на системы и слои абстракции", 60], ["Назначить опытного, но без знания кейса", 36], ["Кейс неочевидно шире, чем кажется", 25]]], ["Декомпозиция", [["Слишком верхнеуровневая или излишне детальная", 80], ["Дословная интерпретация требований", 75], ["Без описанной дельты между AS-IS и TO-BE", 65]]], ["Оценка", [["Цифры — только на ощущениях", 90], ["Без сравнения «кто оценщик» и «кто исполнители»", 80], ["Не описаны допущения, когда требований нет", 80]]], ["Критический путь", [["Оценка задачи приравнена к её длительности", 90], ["Узкий коридор «сделай GANT» без участия «до»", 70], ["Сумма оценок принята за стоимость проекта", 60]]]];
function Facts() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "accent"
  }, "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"), /*#__PURE__*/React.createElement(Chip, null, "3\u20135 \u043C\u0438\u043D\u0443\u0442"), /*#__PURE__*/React.createElement(Chip, null, "\u043F\u043E\u0433\u0440\u0435\u0448\u043D\u043E\u0441\u0442\u044C 10\u201320%"));
}
function AiEvaluationScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "blueprint",
    style: {
      borderBottom: "1px solid var(--border)",
      paddingBlock: "5rem 4rem"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1.5rem"
    }
  }, "AI-\u043E\u0446\u0435\u043D\u043A\u0430 \u043A\u0430\u043A \u0441\u0435\u0440\u0432\u0438\u0441"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: "3rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-display-3)"
    }
  }, "\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0439 \u043E\u0446\u0435\u043D\u043A\u0443 \u0418\u0422-\u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0437\u0430 ~10 \u043C\u0438\u043D\u0443\u0442 \u0441 AI"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)",
      marginTop: "1.5rem",
      maxWidth: "52ch"
    }
  }, "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0448\u044C \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F, \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0448\u044C \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u2014 \u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0448\u044C \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0441 \u0440\u0438\u0441\u043A\u0430\u043C\u0438 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F\u043C\u0438. \u0414\u0435\u043B\u0430\u0439 \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u043E, \u0431\u0435\u0437 \u043C\u043D\u043E\u0433\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "2rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0446\u0435\u043D\u043A\u0435"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go("home")
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0441 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u043E\u043C")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement(Facts, null))), /*#__PURE__*/React.createElement("div", {
    className: "blueprint",
    style: {
      aspectRatio: "4 / 3",
      background: "var(--secondary)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, "\u041F\u0440\u0438\u043C\u0435\u0440 \u043E\u0446\u0435\u043D\u043A\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430"))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "3rem"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1.5rem"
    }
  }, "\u041A\u043E\u0440\u043E\u0442\u043A\u043E \u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: "1px solid var(--border)",
      paddingTop: "1.5rem",
      gap: "1.5rem"
    }
  }, [["Для кого", "бизнес, ИТ, PMO, Product"], ["Ситуация", "быстро оценить БТ/ФТ"], ["Желательно", "загрузить документы"], ["Погрешность", "от 10 до 20% на тест-сете"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "1.0625rem"
    }
  }, v))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "3rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041E\u043D\u0431\u043E\u0440\u0434\u0438\u043D\u0433",
    title: "\u041A\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u043F\u0443\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u043E\u0446\u0435\u043D\u043A\u0438"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1.25rem"
    }
  }, ONBOARD.map(([n, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    pad: false,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "blueprint",
    style: {
      aspectRatio: "4 / 3",
      background: "var(--secondary)",
      borderBottom: "1px solid var(--border)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)"
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-h4)",
      textTransform: "none",
      lineHeight: 1.25
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, d)))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0427\u0442\u043E \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442",
    title: "\u041D\u0430 \u043A\u0430\u043A\u0438\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 AI-\u043E\u0446\u0435\u043D\u043A\u0430"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1.25rem"
    }
  }, DIMS.map(([t, q], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      textTransform: "none",
      marginBlock: "0.5rem"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, q)))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      marginTop: "1.25rem"
    }
  }, "\u0412 \u043E\u0441\u043D\u043E\u0432\u0435 \u2014 300+ \u043F\u043B\u0430\u043D-\u0444\u0430\u043A\u0442\u043E\u0432 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0418\u0422-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441 2018 \u043F\u043E 2026 \u0433\u043E\u0434 \u0438 \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u044F PMBoK (PMI)")), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0427\u0442\u043E AI \u043B\u043E\u0432\u0438\u0442 \u0437\u0430 \u0432\u0430\u0441",
    title: "\u041F\u043E\u0434\u0441\u0432\u0435\u0442\u0438\u0442 \u043E\u0448\u0438\u0431\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043B\u0435\u0433\u043A\u043E \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
    lead: "% \u2014 \u043A\u0430\u043A \u0447\u0430\u0441\u0442\u043E \u044D\u0442\u0443 \u043E\u0448\u0438\u0431\u043A\u0443 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u043F\u0440\u0438 \u0440\u0443\u0447\u043D\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0435 (\u043F\u043E \u043D\u0430\u0448\u0435\u0439 \u0432\u044B\u0431\u043E\u0440\u043A\u0435 \u043F\u043B\u0430\u043D-\u0444\u0430\u043A\u0442\u043E\u0432)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "2rem"
    }
  }, ERRORS.map(([group, rows]) => /*#__PURE__*/React.createElement("div", {
    key: group
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      textTransform: "none",
      marginBottom: "0.5rem"
    }
  }, group), rows.map(([l, p]) => /*#__PURE__*/React.createElement(MetricBar, {
    key: l,
    label: l,
    percent: p
  })))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0427\u0442\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u043E\u0446\u0435\u043D\u043A\u0438",
    title: "\u0420\u0435\u0435\u0441\u0442\u0440 \u0440\u0438\u0441\u043A\u043E\u0432 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439",
    lead: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442 \u0440\u0438\u0441\u043A\u0438 \u0441 \u0432\u043B\u0438\u044F\u043D\u0438\u0435\u043C \u043D\u0430 \u0441\u0440\u043E\u043A\u0438 \u0438 \u0431\u044E\u0434\u0436\u0435\u0442, \u0430 \u0440\u044F\u0434\u043E\u043C \u2014 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u0441\u043A\u043E\u0443\u043F\u0430. \u0418 \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0434\u043E ~10 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445, \u0447\u0442\u043E\u0431\u044B \u043E\u0446\u0435\u043D\u043A\u0430 \u0447\u0438\u0442\u0430\u043B\u0430\u0441\u044C"
  }), /*#__PURE__*/React.createElement(Card, {
    radius: "3xl",
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1rem 1.75rem",
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, "revelio \xB7 \u043E\u0446\u0435\u043D\u043A\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 / \u0440\u0435\u0435\u0441\u0442\u0440"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: "2.5rem",
      padding: "1.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      textTransform: "none"
    }
  }, "\u0420\u0438\u0441\u043A\u0438"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, "4 \u0438\u0437 ~10")), /*#__PURE__*/React.createElement(RiskItem, {
    title: "\u041D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D \u043C\u0430\u0441\u0442\u0435\u0440-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0443",
    impacts: [{
      label: "сроки",
      value: "+18%"
    }, {
      label: "бюджет",
      value: "+1.4 млн ₽"
    }]
  }), /*#__PURE__*/React.createElement(RiskItem, {
    title: "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 legacy-\u0441\u0438\u0441\u0442\u0435\u043C\u043E\u0439 \u0431\u0435\u0437 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438",
    impacts: [{
      label: "сроки",
      value: "+22%"
    }, {
      label: "бюджет",
      value: "+1.8 млн ₽"
    }]
  }), /*#__PURE__*/React.createElement(RiskItem, {
    title: "\u041D\u0435 \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0451\u043D \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043D\u044B\u0439 owner \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430",
    impacts: [{
      label: "сроки",
      value: "+12%"
    }, {
      label: "бюджет",
      value: "+0.9 млн ₽"
    }]
  }), /*#__PURE__*/React.createElement(RiskItem, {
    title: "\u041D\u0435 \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D \u0441\u043A\u043E\u0443\u043F \u041D\u0424\u0422 (\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C, \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0430)",
    impacts: [{
      label: "сроки",
      value: "+15%"
    }, {
      label: "бюджет",
      value: "+1.1 млн ₽"
    }]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      textTransform: "none"
    }
  }, "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, "a-la-carte")), /*#__PURE__*/React.createElement(StepList, {
    variant: "compact",
    steps: [{
      title: "Регламент работы, критерии приёмки, число итераций"
    }, {
      title: "Инфраструктура, безопасность и окружение"
    }, {
      title: "Сайзинг сред: нагрузка, катастрофоустойчивость"
    }, {
      title: "Миграция данных: объёмы и источники"
    }, {
      title: "Мастер-система и золотая запись по домену"
    }, {
      title: "Язык интерфейса и языки работы операторов"
    }]
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      marginTop: "1rem"
    }
  }, "* \u0420\u0438\u0441\u043A\u0438 \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0438 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434 \u043F\u0440\u043E\u0435\u043A\u0442 \u2014 \u043D\u0430 \u0441\u0445\u0435\u043C\u0435 \u043F\u0440\u0438\u0432\u0435\u0434\u0451\u043D \u043F\u0440\u0438\u043C\u0435\u0440")), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 2rem"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    radius: "3xl",
    style: {
      padding: "3rem",
      alignItems: "flex-start",
      gap: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)"
    }
  }, "\u0413\u043E\u0442\u043E\u0432\u044B \u043E\u0446\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      opacity: 0.75,
      maxWidth: "60ch"
    }
  }, "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u043E\u0446\u0435\u043D\u043A\u0443 \u0441 \u0440\u0438\u0441\u043A\u0430\u043C\u0438 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F\u043C\u0438 \u2014 \u0437\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0446\u0435\u043D\u043A\u0435"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go("home")
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0441 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u043E\u043C")))));
}
Object.assign(window, {
  AiEvaluationScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AiEvaluationScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
const {
  Header,
  Footer,
  HomeScreen,
  ConsultingScreen,
  AiEvaluationScreen
} = window;
function App() {
  const [page, setPage] = React.useState("home");
  const go = p => {
    setPage(p);
    window.scrollTo({
      top: 0
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
    page: page,
    go: go
  }), page === "home" ? /*#__PURE__*/React.createElement(HomeScreen, {
    go: go
  }) : null, page === "consulting" ? /*#__PURE__*/React.createElement(ConsultingScreen, {
    go: go
  }) : null, page === "ai" ? /*#__PURE__*/React.createElement(AiEvaluationScreen, {
    go: go
  }) : null, /*#__PURE__*/React.createElement(Footer, {
    go: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
const {
  Wordmark,
  Button,
  Container,
  SectionLabel
} = window.RevelioDesignSystem_a31b32;
const NAV = [{
  label: "Главная",
  page: "home"
}, {
  label: "Услуги",
  page: "consulting"
}, {
  label: "Кейсы",
  page: "home",
  hash: "cases"
}, {
  label: "Процесс",
  page: "home",
  hash: "process"
}, {
  label: "Журнал",
  page: "home",
  hash: "media"
}, {
  label: "Контакты",
  page: "home",
  hash: "contacts"
}];
function Header({
  page,
  go
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "color-mix(in oklab, var(--background) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2rem",
      height: "4.5rem"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go("home"),
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 19
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "1.75rem"
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.label,
    onClick: () => go(n.page),
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: page === n.page && !n.hash ? "var(--accent)" : "var(--muted-foreground)"
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      color: "var(--muted-foreground)"
    }
  }, "welcome@revelio.tech"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go("ai")
  }, "\u041E\u0446\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"))));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border)",
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      paddingBlock: "3.5rem 2rem",
      marginTop: "5rem"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr",
      gap: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 22,
    tone: "paper"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      opacity: 0.7,
      maxWidth: "34ch"
    }
  }, "\u0412\u043D\u0435\u0434\u0440\u044F\u0435\u043C \u043D\u043E\u0432\u0443\u044E \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443 \u0432 \u0431\u0438\u0437\u043D\u0435\u0441: \u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433, \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0438 \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0434\u043B\u044F \u0441\u0440\u0435\u0434\u043D\u0435\u0433\u043E \u0438 \u043A\u0440\u0443\u043F\u043D\u043E\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      color: "color-mix(in oklab, var(--primary-foreground) 60%, transparent)"
    }
  }, "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F"), NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.label,
    onClick: () => go(n.page),
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--primary-foreground)",
      opacity: 0.75
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      color: "color-mix(in oklab, var(--primary-foreground) 60%, transparent)"
    }
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "1.125rem"
    }
  }, "+7-993-590-9260"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-sm)",
      opacity: 0.6
    }
  }, "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E \u0441 10:00 \u0434\u043E 20:00"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-body-sm)",
      opacity: 0.75
    }
  }, "@reveliotech \xB7 welcome@revelio.tech"))), /*#__PURE__*/React.createElement(Container, {
    style: {
      marginTop: "2.5rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid color-mix(in oklab, var(--primary-foreground) 18%, transparent)",
      display: "flex",
      justifyContent: "space-between",
      gap: "2rem",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026, \u041E\u041E\u041E \xAB\u0420\u0435\u0432\u0435\u043B\u0438\u043E\xBB \xB7 \u0418\u041D\u041D 9714091225"), /*#__PURE__*/React.createElement("span", null, "\u0426\u0435\u043D\u044B \u0438 \u0441\u0440\u043E\u043A\u0438 \u043D\u043E\u0441\u044F\u0442 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440")));
}
Object.assign(window, {
  Header,
  Footer,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ConsultingScreen.jsx
try { (() => {
const {
  Container,
  SectionHeading,
  SectionLabel,
  Button,
  Chip,
  Card,
  ServiceCard,
  ArtifactRow,
  ContactForm
} = window.RevelioDesignSystem_a31b32;
const ASIS = [["Классификатор бизнес-процессов", "Excel · целиком", "440 000 ₽"], ["Схема бизнес-процесса BPMN", "BPMN · 1 процесс", "28 000 ₽"], ["Тепловая карта проблемных точек процессов", "Excel · 1 область", "530 000 ₽"], ["Маппинг проблемных точек и бизнес-метрик", "Excel · 1 область", "180 000 ₽"], ["Customer Journey Map + реестр точек контакта", "Miro, Excel", "230 000 ₽"], ["Описание бизнес- и ИТ-архитектуры", "Word, Archimate · 1 область", "140 000 ₽"]];
const TOBE = [["Концепция изменения детальная", "PPT · 1 юнит", "480 000 ₽"], ["Целевые бизнес-процессы и клиентские маршруты", "Excel, BPMN, Miro", "54 000 ₽"], ["БТ / ФТ / ТЗ + НФТ к разработке", "Word, Excel · 1 продукт", "350 000 ₽"], ["Инвестиционная модель проекта (TCO)", "Excel · 1 проект", "180 000 ₽"], ["Расчёт ROI на 3–5 лет", "Excel · 1 проект", "140 000 ₽"], ["Целевая архитектура решения и потоки данных", "Archimate · 1 проект", "180 000 ₽"]];
const OPS = ["NPS", "Service Level", "CSAT", "Полезная утилизация", "% корректного планирования смен", "Отток персонала", "Пропущенные звонки", "Доля повторных обращений"];
const COM = ["LTV", "Конверсия", "Удержание клиента", "Средний чек", "CAC", "ФОТ", "Стоимость владения ИТ", "Кол-во FTE поддержки"];
const SCOPE = ["Мобильное приложение", "Веб-сайт", "eCom / интернет-магазин", "Личный кабинет", "Закупочный портал", "HR-портал", "Ценообразование", "HRM", "oCRM", "aCRM / Campaign", "Loyalty / CDP", "MDM / НСИ", "Сквозная аналитика", "CX: КЦ, чат, QM", "Help Desk", "ОЦО и ITSM", "DWH / Data Lake"];
function MetricColumn({
  title,
  items
}) {
  return /*#__PURE__*/React.createElement(Card, {
    radius: "2xl"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)",
      textTransform: "none",
      marginBottom: "0.75rem"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: "0.5rem"
    }
  }, items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "0.625rem",
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--accent)"
    }
  }, "\u2014"), i))));
}
function ConsultingScreen() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "blueprint",
    style: {
      borderBottom: "1px solid var(--border)",
      paddingBlock: "5rem 4rem"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1.5rem"
    }
  }, "\u0423\u0441\u043B\u0443\u0433\u0430"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-display-2)",
      maxWidth: "20ch"
    }
  }, "\u0411\u0438\u0437\u043D\u0435\u0441/\u0418\u0422/AI-\u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "outline"
  }, "AS IS"), /*#__PURE__*/React.createElement(Chip, {
    tone: "accent"
  }, "TO BE")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)",
      maxWidth: "48ch",
      marginTop: "1.5rem"
    }
  }, "\u041F\u043E\u043C\u043E\u0433\u0430\u0435\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C \u0442\u0440\u0430\u043D\u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0436\u0430\u0441\u043D\u043E\u0435 \u2192 \u0432 \u0444\u0435\u043D\u043E\u043C\u0435\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0438 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442\u044C \u0431\u044E\u0434\u0436\u0435\u0442\u044B"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "2rem",
      marginTop: "2rem",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "01 \u0410\u043D\u0430\u043B\u0438\u0437"), /*#__PURE__*/React.createElement("span", null, "02 \u041F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("span", null, "03 \u0412\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      marginTop: "2.25rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg"
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary"
  }, "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u0432 Telegram")))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B \u0440\u0430\u0431\u043E\u0442\u044B",
    title: "\u0414\u0432\u0430 \u0431\u0430\u0437\u043E\u0432\u044B\u0445 \u0444\u043E\u0440\u043C\u0430\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u044B",
    lead: "\u041E\u0434\u043D\u0430 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u043D\u0430 \u0432\u044B\u0431\u043E\u0440 \u2014 \u0433\u043B\u0443\u0431\u0438\u043D\u0443 \u0430\u0443\u0434\u0438\u0442\u0430 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    featured: true,
    title: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0430\u0443\u0434\u0438\u0442",
    price: "345 000 \u20BD",
    unit: "/ 2 \u043D\u0435\u0434\u0435\u043B\u0438",
    lead: "\u0420\u0435\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u043B \u0437\u0434\u0435\u0441\u044C \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043F\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u043E\u043D\u0435 \u0438\u043B\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0443",
    bullets: ["Обследуем AS IS: процессы, ИТ-системы, клиентские пути", "Интервью C-level / middle / линейный персонал", "Рекомендации к изменению бизнес-процессов", "Оценка влияния изменений на метрики в деньгах"],
    chips: ["Клиентский сервис", "Массовый рекрутмент", "ИТ-поддержка"],
    cta: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
  }), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043D\u0430 \u0446\u0438\u0444\u0440\u0430\u0445",
    price: "590 000 \u20BD",
    unit: "/ 4 \u043D\u0435\u0434\u0435\u043B\u0438",
    lead: "\u0413\u043B\u0443\u0431\u043E\u043A\u0438\u0439 \u0430\u0443\u0434\u0438\u0442 \u043D\u0430 \u0446\u0438\u0444\u0440\u0430\u0445: \u0440\u0435\u0433\u043B\u0430\u043C\u0435\u043D\u0442\u044B, \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0438 \u043E\u0446\u0435\u043D\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439 \u0432 \u0434\u0435\u043D\u044C\u0433\u0430\u0445",
    bullets: ["Всё из «Быстрого аудита», плюс глубина", "Обследование AS IS: регламенты и метрики", "Полные интервью на всех уровнях", "Маппинг проблемных точек и бизнес-метрик"],
    chips: ["Клиентский сервис", "Массовый рекрутмент", "ИТ-поддержка"],
    cta: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)",
      marginTop: "1.25rem"
    }
  }, "\u0414\u0440\u0443\u0433\u0438\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433\u0430 \u2014 \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u043F\u0440\u043E\u0434\u0430\u0436\u0438, \u043B\u043E\u044F\u043B\u044C\u043D\u043E\u0441\u0442\u044C, \u043A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438 \u2014 \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E")), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
    title: "\u041A\u0430\u043A\u0438\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u043C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C\u0438",
    lead: "\u0420\u0430\u0441\u0442\u0438\u043C, \u0441\u043E\u043A\u0440\u0430\u0449\u0430\u0435\u043C \u2014 \u0438 \u0442\u043E, \u0438 \u0434\u0440\u0443\u0433\u043E\u0435 \u0432 \u0432\u0430\u0448\u0443 \u043F\u043E\u043B\u044C\u0437\u0443"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement(MetricColumn, {
    title: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0435",
    items: OPS
  }), /*#__PURE__*/React.createElement(MetricColumn, {
    title: "\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435",
    items: COM
  }))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041A\u043E\u043D\u0442\u0443\u0440 \u043A\u043E\u043D\u0441\u0430\u043B\u0442\u0438\u043D\u0433\u0430",
    title: "\u041A\u043B\u0430\u0441\u0441\u044B \u0440\u0435\u0448\u0435\u043D\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E\u043A\u0440\u044B\u0432\u0430\u0435\u043C"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem"
    }
  }, SCOPE.map(s => /*#__PURE__*/React.createElement(Chip, {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "A-la-carte",
    title: "\u0415\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0431\u0430\u0437\u043E\u0432\u044B\u0439 \u0430\u0443\u0434\u0438\u0442",
    lead: "\u041B\u044E\u0431\u043E\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E \u2014 \u043E\u0442 \u0441\u0445\u0435\u043C\u044B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0434\u043E \u0446\u0435\u043B\u0435\u0432\u043E\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u044B \u0440\u0435\u0448\u0435\u043D\u0438\u044F. \u0426\u0435\u043D\u044B \u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u044B\u0435"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      marginBottom: "0.5rem"
    }
  }, "AS IS \u2014 11 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432 \xB7 \u043E\u0442 28 000 \u20BD"), ASIS.map(([t, fm, p]) => /*#__PURE__*/React.createElement(ArtifactRow, {
    key: t,
    title: t,
    format: fm,
    price: p
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      marginBottom: "0.5rem"
    }
  }, "TO BE \u2014 16 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432 \xB7 \u043E\u0442 23 000 \u20BD"), TOBE.map(([t, fm, p]) => /*#__PURE__*/React.createElement(ArtifactRow, {
    key: t,
    title: t,
    format: fm,
    price: p
  }))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: "4rem",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1rem"
    }
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)"
    }
  }, "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u0439 \u0437\u0430\u0434\u0430\u0447\u0435 \uD83D\uDCAC"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)",
      marginTop: "1rem"
    }
  }, "\u041E\u0446\u0435\u043D\u0438\u043C \u0437\u0430 3\u20135 \u0434\u043D\u0435\u0439, \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0438")), /*#__PURE__*/React.createElement(ContactForm, null))));
}
Object.assign(window, {
  ConsultingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ConsultingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Container,
  SectionHeading,
  SectionLabel,
  Button,
  Chip,
  CaseCard,
  ArticleCard,
  ServiceCard,
  TeamCard,
  StatBlock,
  Marquee,
  StepList,
  ContactForm,
  Card
} = window.RevelioDesignSystem_a31b32;
const CASES = [{
  glyph: "✈️",
  category: "B2B Travel Tech",
  title: "Портал «Командировки» для Банка ТОП-10 РФ",
  description: "Разработка в интеграции с процессингом TuTu.ru, ЭДО, контакт-центром и отельными API",
  cover: true
}, {
  glyph: "🛟",
  category: "ITSM",
  title: "L1, L2 процессы поддержки сотрудников",
  description: "Процессы обслуживания для 50+ ЮЛ крупной добывающей компании РФ"
}, {
  glyph: "📊",
  category: "Data / BI",
  title: "КХД, НСИ и единая BI-система",
  description: "КХД на 3 слоя, ETL и глоссарий, BI для B2C+B2B: продажи, маркетинг, операции",
  cover: true
}, {
  glyph: "🎮",
  category: "Product Design",
  title: "Gaming App для Alfa Gen",
  description: "Проектирование игрового приложения для поколений 8–16 лет в интеграции с лояльностью"
}, {
  glyph: "🧩",
  category: "HR Tech",
  title: "ЛК Кандидата и автоматизация найма",
  description: "Внешняя и авторизованная зона в интеграции с ATS. Унификация НСИ, дедупликация записей"
}, {
  glyph: "📞",
  category: "WFM",
  title: "WFM-система на 300 операторов КЦ",
  description: "Перевод КЦ телеком-оператора с калькулятора Эрланга на WFM → экономия 20+ FTE"
}];
const SERVICES = [{
  featured: true,
  glyph: "🔥",
  title: "Консалтинг",
  price: "от 345 000 ₽",
  unit: "/ 1 неделя",
  lead: "Редкие эксперты и секретные знания для принятия решений",
  bullets: ["Анализ процессов, поиск причин потерь", "Проектирование изменений: бизнес и ИТ", "Внедрение улучшений"],
  chips: ["LTV", "TCO", "CAC", "Отток"],
  cta: "Отправить заявку"
}, {
  glyph: "🔍",
  title: "Проверка гипотезы",
  price: "до 650 000 ₽",
  unit: "/ за прототип",
  lead: "Тестирование идей — прототип за 1 неделю",
  bullets: ["Собрать решение руками практиков", "Не тратить время на бесплодные эксперименты", "Быстрый, измеримый результат"],
  chips: ["AI-агент", "Панель отчётов", "Оркестратор скидок"],
  cta: "Отправить заявку"
}, {
  glyph: "📦",
  title: "Разработка продукта",
  price: "от 850 000 ₽",
  unit: "/ команда в месяц",
  lead: "Запуск с нуля или доработки: от требований до решения в PROD",
  bullets: ["Анализ → проектирование → разработка", "Тестирование и запуск в прод", "Релизы каждые 2 недели"],
  chips: ["eCom", "CDP", "Loyalty", "DWH", "НСИ"],
  cta: "Оценить стоимость"
}];
const TEAM = [{
  name: "Анастасия",
  role: "CEO",
  bio: "Руководила ИТ-командами в Ameria Bank, «Джет». Запускала проекты с Ингосстрах, TuTu, Дикси",
  tags: ["Банки", "Retail", "AI for IT", "ITIL"]
}, {
  name: "Александр",
  role: "Партнёр",
  bio: "Руководил CX-практикой и командами в проектах для KIA, Лукойл, Unitel, Ренессанс, СИБУР",
  tags: ["eCom", "Telco", "CX", "Loyalty", "CDP"]
}, {
  name: "Илья",
  role: "Консультант · Технологии",
  bio: "Проектировал B2B, loyalty и cloud-native k8s-платформы, AI/Dify-пайплайны, интеграции",
  tags: ["AI", "Kubernetes", "CI/CD"]
}, {
  name: "Александр",
  role: "Консультант · Технологии",
  bio: "Развивал tech привлечения и маркетинга, управление ИТ и gen AI в банках РФ ТОП-10",
  tags: ["Бигтех", "GenAI", "Platform"]
}];
function Cover({
  ratio = "16 / 10"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "blueprint",
    style: {
      aspectRatio: ratio,
      background: "var(--secondary)",
      borderBottom: "1px solid var(--border)"
    }
  });
}
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "blueprint",
    style: {
      borderBottom: "1px solid var(--border)",
      paddingBlock: "5rem 3rem"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
      marginBottom: "1.75rem"
    }
  }, ["Консалтинг", "Разработка", "Процессы"].map(c => /*#__PURE__*/React.createElement(Chip, {
    key: c
  }, c))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-display-1)",
      maxWidth: "22ch"
    }
  }, "\u0412\u043D\u0435\u0434\u0440\u044F\u0435\u043C \u043D\u043E\u0432\u0443\u044E \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0443", /*#__PURE__*/React.createElement("br", null), "\u0432 \u0431\u0438\u0437\u043D\u0435\u0441"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)",
      maxWidth: "56ch",
      marginTop: "1.5rem"
    }
  }, "\u041E\u0442 \u043E\u0446\u0435\u043D\u043A\u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u0434\u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0432\u043D\u0443\u0442\u0440\u044C \u0431\u0438\u0437\u043D\u0435\u0441\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap",
      marginTop: "2.25rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go("ai")
  }, "\u041E\u0446\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary"
  }, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0443")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      marginTop: "4rem",
      borderTop: "1px solid var(--border)",
      paddingTop: "1.75rem",
      gap: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "15 \u043B\u0435\u0442",
    label: "\u0432 \u0418\u0422-\u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "10 \u043C\u0438\u043D\u0443\u0442",
    label: "\u0434\u043E \u043E\u0442\u0432\u0435\u0442\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442\u0430"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3\u20135 \u0434\u043D\u0435\u0439",
    label: "\u043D\u0430 \u043E\u0446\u0435\u043D\u043A\u0443, \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "2 \u043D\u0435\u0434\u0435\u043B\u0438",
    label: "\u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u043F\u0440\u043E\u0442\u043E\u0442\u0438\u043F"
  }))));
}
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041A\u0435\u0439\u0441\u044B",
    title: "\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0435 \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F",
    lead: "\u041E\u0442 \u0434\u0435\u043A\u043E\u043C\u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0437\u0430 2\u20137 \u0434\u043D\u0435\u0439 \u0434\u043E \u0440\u0435\u0448\u0430\u044E\u0449\u0435\u0433\u043E \u0431\u043E\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0437\u0430 3\u20135 \u043C\u0435\u0441\u044F\u0446\u0435\u0432",
    aside: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      trailing: "\u2192"
    }, "\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u0440\u0435\u0444\u0435\u0440\u0435\u043D\u0441")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.25rem"
    }
  }, CASES.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-2xl)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, c.cover ? /*#__PURE__*/React.createElement(Cover, null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--muted-foreground)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "0.95rem"
    }
  }, c.glyph), c.category), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "var(--text-h4)",
      lineHeight: 1.25,
      textTransform: "none"
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      color: "var(--muted-foreground)"
    }
  }, c.description)))))), /*#__PURE__*/React.createElement(Container, {
    as: "section"
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1rem"
    }
  }, "\u041E\u043F\u044B\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u044B"), /*#__PURE__*/React.createElement(Marquee, {
    items: ["Альфа-Банк", "Tutu", "ДИКСИ", "ЦБ РФ", "MOEX", "KIA", "ЛУКОЙЛ", "AmeriaBank", "Unitel"]
  })), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u044B",
    title: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u044B",
    lead: "\u0418\u0422 \u0438 \u0431\u0438\u0437\u043D\u0435\u0441-\u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 \u0432 \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u044F\u0445: \u0431\u0430\u043D\u043A\u0438, \u0440\u0438\u0442\u0435\u0439\u043B, \u0442\u0435\u043B\u0435\u043A\u043E\u043C, eCom, \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C, \u0430\u0432\u0442\u043E"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1.25rem"
    }
  }, TEAM.map((t, i) => /*#__PURE__*/React.createElement(TeamCard, _extends({
    key: i
  }, t))))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u0423\u0441\u043B\u0443\u0433\u0438",
    title: "\u0422\u0440\u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u0430 \u0440\u0430\u0431\u043E\u0442\u044B",
    lead: "\u041F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u0444\u043E\u0440\u043C\u0430\u0442 \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443: \u043E\u0442 \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u043C\u043D\u0435\u043D\u0438\u044F \u0434\u043E \u043F\u043E\u043B\u043D\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.25rem"
    }
  }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: i
  }, s)))), /*#__PURE__*/React.createElement(Card, {
    tone: "ink",
    radius: "2xl",
    style: {
      marginTop: "1.25rem",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2rem",
      padding: "1.75rem 2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "1.5rem"
    }
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      fontSize: "var(--text-h4)"
    }
  }, "AI-\u043E\u0446\u0435\u043D\u043A\u0430 \u043A\u0430\u043A \u0441\u0435\u0440\u0432\u0438\u0441"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-sm)",
      opacity: 0.7
    }
  }, "\u041C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u044F 15 \u043B\u0435\u0442 \u0418\u0422-\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0432 \u0432 AI-\u0430\u0433\u0435\u043D\u0442\u0435 \u0434\u043B\u044F \u0431\u044B\u0441\u0442\u0440\u043E\u0439 \u043E\u0446\u0435\u043D\u043A\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u0442\u0438\u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0438"))), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go("ai")
  }, "\u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432 1 \u043A\u043B\u0438\u043A"))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041C\u0435\u0434\u0438\u0430",
    title: "\u0416\u0443\u0440\u043D\u0430\u043B",
    lead: "\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u0430\u044F \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u044B",
    aside: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      trailing: "\u2192"
    }, "\u0412\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement(ArticleCard, {
    kind: "Forbes",
    year: "2025",
    title: "\u041E\u0442 Excel \u043A ML: \u043A\u0430\u043A \u0431\u0438\u0437\u043D\u0435\u0441\u0443 \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430 \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0446\u0435\u043D\u043E\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435",
    excerpt: "\u0420\u0430\u0437\u0431\u043E\u0440 \u0448\u0430\u0433\u043E\u0432 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043E\u0442 \u0440\u0443\u0447\u043D\u044B\u0445 \u043F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442\u043E\u0432 \u043A ML-\u043C\u043E\u0434\u0435\u043B\u044F\u043C: \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u043E\u043C\u0430\u043D\u0434\u0430, \u043F\u0438\u043B\u043E\u0442\u044B \u0438 \u043C\u0435\u0442\u0440\u0438\u043A\u0438",
    links: [{
      label: "Читать"
    }]
  }), /*#__PURE__*/React.createElement(ArticleCard, {
    kind: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435",
    title: "\u041A\u0430\u043A \u0432\u044B\u0431\u0440\u0430\u0442\u044C CDP / Loyalty / Comms \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443 \u0432 2026?",
    excerpt: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 CDP, \u043A\u0430\u043C\u043F\u0435\u0439\u043D-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u043E\u0432 \u0438 RTDM: \u043C\u043E\u0434\u0435\u043B\u0438 \u0434\u0430\u043D\u043D\u044B\u0445, \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438, TCO",
    links: [{
      label: "Получить доступ"
    }]
  }), /*#__PURE__*/React.createElement(ArticleCard, {
    kind: "\u041F\u043E\u0434\u043A\u0430\u0441\u0442",
    title: "\u041F\u043E\u0434\u043A\u0430\u0441\u0442 \u043E \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u043E\u0439 \u0434\u0438\u043D\u0430\u043C\u0438\u043A\u0435 \u0438 \u043C\u043E\u0434\u0435\u043B\u0438 BART",
    excerpt: "\u0410\u043D\u0430\u0441\u0442\u0430\u0441\u0438\u044F \u2014 \u043E \u0440\u043E\u043B\u044F\u0445, \u0433\u0440\u0430\u043D\u0438\u0446\u0430\u0445 \u0438 \u0432\u043B\u0430\u0441\u0442\u0438 \u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u0430\u0445 \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u0438\u0437\u043C\u0443 \u043C\u043E\u0434\u0435\u043B\u0438 BART",
    links: [{
      label: "Podster"
    }, {
      label: "YouTube"
    }]
  }))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 5rem"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    label: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0440\u0430\u0431\u043E\u0442\u044B",
    title: "\u041A\u0430\u043A \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u043C \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u044B"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      textTransform: "none",
      marginBottom: "0.5rem"
    }
  }, "\uD83D\uDCD0 \u041A\u0430\u043A \u043E\u0446\u0435\u043D\u0438\u0432\u0430\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)",
      marginBottom: "0.75rem"
    }
  }, "3\u201314 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439"), /*#__PURE__*/React.createElement(StepList, {
    variant: "compact",
    steps: [{
      title: "Анализ бизнес-контекста и требований"
    }, {
      title: "Декомпозиция и образ результата"
    }, {
      title: "Оценка работ, допущения и риски"
    }, {
      title: "Ресурсный план, сборка TCO проекта"
    }]
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      textTransform: "none",
      marginBottom: "0.5rem"
    }
  }, "\uD83D\uDE80 \u041A\u0430\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u043C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-mono-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--accent)",
      marginBottom: "0.75rem"
    }
  }, "\u043E\u0442 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0434\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438"), /*#__PURE__*/React.createElement(StepList, {
    steps: [{
      title: "Сборка команды",
      meta: "1–2 недели",
      description: "Подбор экспертов, формирование рабочей группы, согласование этапов и результатов"
    }, {
      title: "Внедрение и 1-й результат",
      meta: "2–4 месяца",
      description: "Разработка, запуск продуктов и процессов, первые измеримые результаты"
    }, {
      title: "Передача экспертизы",
      meta: "1–3 месяца",
      description: "Передача компетенций через переход наших экспертов в штат к Заказчику"
    }, {
      title: "Поддержка и развитие",
      meta: "по требованию",
      description: "Стабилизация продукта или практики, переход в поддержку и доработку"
    }]
  })))), /*#__PURE__*/React.createElement(Container, {
    as: "section",
    style: {
      paddingBlock: "1rem 2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: "4rem",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: "1rem"
    }
  }, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)"
    }
  }, "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u0439 \u0437\u0430\u0434\u0430\u0447\u0435 \uD83D\uDCAC"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-body-lg)",
      color: "var(--muted-foreground)",
      marginTop: "1rem"
    }
  }, "\u041E\u0446\u0435\u043D\u0438\u043C \u0437\u0430 3\u20135 \u0434\u043D\u0435\u0439, \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043F\u043E \u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u0438. \u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 10 \u043C\u0438\u043D\u0443\u0442 \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u0442 \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0432\u0435\u0446, \u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u043D\u0442 \u0441 10+ \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430")), /*#__PURE__*/React.createElement(ContactForm, null))));
}
Object.assign(window, {
  HomeScreen,
  Cover
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.ArtifactRow = __ds_scope.ArtifactRow;

__ds_ns.MetricBar = __ds_scope.MetricBar;

__ds_ns.RiskItem = __ds_scope.RiskItem;

__ds_ns.Consent = __ds_scope.Consent;

__ds_ns.ContactForm = __ds_scope.ContactForm;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Container = __ds_scope.Container;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StepList = __ds_scope.StepList;

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CaseCard = __ds_scope.CaseCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TeamCard = __ds_scope.TeamCard;

})();
