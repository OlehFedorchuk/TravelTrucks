import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { fetchById } from "../../redux/carsOps";
import { setTab } from "../../redux/tabSlice";
import css from "./Details.module.css";
import KitchenIcon from "../../assets/icons/kitchen.svg?react";
import AutoIcon from "../../assets/icons/automatic.svg?react";
import PetrolIcon from "../../assets/icons/petrol.svg?react";
import AcIcon from "../../assets/icons/ac.svg?react";
import StarIcon from "../../assets/icons/star.svg?react";
import MapIcon from "../../assets/icons/map.svg?react";
import BathroomIcon from "../../assets/icons/bathroom.svg?react";
import RadioIcon from "../../assets/icons/radio.svg?react";
import RefrigeratorIcon from "../../assets/icons/refrigerator.svg?react";
import MicrowaveIcon from "../../assets/icons/microwave.svg?react";
import WaterIcon from "../../assets/icons/water.svg?react";
import GasIcon from "../../assets/icons/gas.svg?react";

const selectSelectedCar = (state) => state.cars.data.selectedCar;

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const dateRef = useRef(null);
  const [isDateFocused, setIsDateFocused] = useState(false);
  const tabRaw = useSelector((state) => state.tab);
  const tab = typeof tabRaw === "string" ? tabRaw : tabRaw?.value;

  const car = useSelector(selectSelectedCar);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    date: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const FEATURE_ICONS = useMemo(
    () => ({
      transmission: AutoIcon,
      AC: AcIcon,
      kitchen: KitchenIcon,
      engine: PetrolIcon,
      bathroom: BathroomIcon,
      radio: RadioIcon,
      refrigerator: RefrigeratorIcon,
      microwave: MicrowaveIcon,
      water: WaterIcon,
      gas: GasIcon,
    }),
    []
  );

  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  useEffect(() => {
    dispatch(setTab("features"));
    dispatch(fetchById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const safeCar = car ?? {};
  const {
    name,
    price,
    rating,
    location,
    description,
    gallery,
    reviews,
    transmission,
    engine,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    AC,
    bathroom,
    kitchen,
    radio,
    microwave,
    refrigerator,
    water,
    gas,
  } = safeCar;

  const photos = (gallery || [])
    .map((g) => g?.original || g?.thumb)
    .filter(Boolean);

  const featureBadges = [
    {
      key: "transmission",
      label:
        transmission && transmission[0].toUpperCase() + transmission.slice(1),
    },
    { key: "AC", label: "AC", show: AC },
    { key: "kitchen", label: "Kitchen", show: kitchen },
    { key: "bathroom", label: "Bathroom", show: bathroom },
    { key: "radio", label: "Radio", show: radio },
    { key: "refrigerator", label: "Refrigerator", show: refrigerator },
    { key: "microwave", label: "Microwave", show: microwave },
    { key: "water", label: "Water", show: water },
    { key: "gas", label: "Gas", show: gas },
    {
      key: "engine",
      label: engine ? engine[0].toUpperCase() + engine.slice(1) : null,
    },
  ].filter((x) => x?.label && (x.show === undefined ? true : x.show));

  const details = [
    ["Form", form],
    ["Length", length],
    ["Width", width],
    ["Height", height],
    ["Tank", tank],
    ["Consumption", consumption],
  ].filter(([, v]) => Boolean(v));

  const reviewsCount = Array.isArray(reviews) ? reviews.length : 0;

  const clampRating = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(5, Math.round(n)));
  };

  const validateField = (field, value) => {
    if (field === "name") {
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return "";
    }

    if (field === "email") {
      if (!value.trim()) return "Email is required";
      const emailOk = /^\S+@\S+\.\S+$/.test(value);
      if (!emailOk) return "Email is not valid";
      return "";
    }

    if (field === "date") {
      if (!value) return "Booking date is required";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(value);
      if (selected < today) return "Booking date can't be in the past";
      return "";
    }

    return "";
  };

  const validateAll = (nextData = formData) => {
    const nextErrors = {
      name: validateField("name", nextData.name),
      email: validateField("email", nextData.email),
      date: validateField("date", nextData.date),
    };
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [fieldName]: value };

      if (touched[fieldName]) {
        setErrors((prevErr) => ({
          ...prevErr,
          [fieldName]: validateField(fieldName, value),
        }));
      }

      return next;
    });
  };

  const handleBlur = (e) => {
    const { name: fieldName, value } = e.target;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, date: true });

    const nextErrors = validateAll();
    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) {
      setNotice({ type: "error", text: "Please fix errors in the form." });
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 700));
      setNotice({
        type: "success",
        text: "✅ Camper successfully booked! We will contact you soon.",
      });

      setFormData({ name: "", email: "", date: "", comment: "" });
      setTouched({ name: false, email: false, date: false });
      setErrors({ name: "", email: "", date: "" });
    } catch {
      setNotice({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) return null;

  return (
    <section className={css.page}>
      <div className={css.container}>
        <header className={css.header}>
          <h1 className={css.title}>{name}</h1>

          <div className={css.metaRow}>
            <span className={css.rating}>
              <span className={css.star}>
                <StarIcon className={clsx(css.starIcon)} />
              </span>
              {rating}
              <span className={css.muted}>({reviewsCount} Reviews)</span>
            </span>

            <span className={css.dot}>
              <MapIcon className={clsx(css.mapIcon)} />
            </span>

            <span className={css.location}>{location}</span>
          </div>

          <p className={css.price}>€{Number(price).toFixed(2)}</p>
        </header>

        <div className={css.gallery}>
          {photos.map((src, idx) => (
            <div key={idx} className={css.photoWrap}>
              <img src={src} alt={`photo-${idx + 1}`} />
            </div>
          ))}
        </div>

        <p className={css.description}>{description}</p>

        <div className={css.tabs}>
          <button
            type="button"
            className={`${css.tab} ${tab === "features" ? css.tabActive : ""}`}
            onClick={() => dispatch(setTab("features"))}
          >
            Features
          </button>

          <button
            type="button"
            className={`${css.tab} ${tab === "reviews" ? css.tabActive : ""}`}
            onClick={() => dispatch(setTab("reviews"))}
          >
            Reviews
          </button>
        </div>
        <div className={css.tabsLine} />

        <div className={css.main}>
          <div className={css.leftCard}>
            {tab === "features" ? (
              <>
                <ul className={css.badges}>
                  {featureBadges.map((f) => {
                    const Icon = FEATURE_ICONS[f.key];
                    return (
                      <li key={f.key} className={css.badge}>
                        {Icon && <Icon className={css.badgeIcon} />}
                        {f.label}
                      </li>
                    );
                  })}
                </ul>

                <h2 className={css.blockTitle}>Vehicle details</h2>
                <div className={css.divider} />

                <ul className={css.details}>
                  {details.map(([label, value]) => (
                    <li key={label} className={css.detailRow}>
                      <span className={css.detailLabel}>{label}</span>
                      <span className={css.detailValue}>{value}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                {!Array.isArray(reviews) || reviews.length === 0 ? (
                  <p className={css.muted}>No reviews yet</p>
                ) : (
                  <ul className={css.reviewsList}>
                    {reviews.map((r, idx) => {
                      const rating5 = clampRating(r?.reviewer_rating);
                      const stars = "★".repeat(rating5) + "☆".repeat(5 - rating5);
                      const initial = (r?.reviewer_name?.[0] || "?").toUpperCase();

                      return (
                        <li key={r?.id ?? idx} className={css.reviewItem}>
                          <div className={css.reviewHeader}>
                            <div className={css.avatar}>{initial}</div>

                            <div className={css.reviewMeta}>
                              <p className={css.reviewName}>{r?.reviewer_name}</p>
                              <div className={css.reviewStarsRow}>
                                <span className={css.reviewStars}>{stars}</span>
                              </div>
                            </div>
                          </div>

                          <p className={css.reviewText}>{r?.comment}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}
          </div>

          <aside className={css.rightCard}>
            <h2 className={css.formTitle}>Book your campervan now</h2>
            <p className={css.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={css.form} onSubmit={handleSubmit} noValidate>
              <div className={css.control}>
                <input
                  className={clsx(
                    css.input,
                    errors.name && touched.name && css.inputError
                  )}
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                />
                {touched.name && errors.name && (
                  <p className={css.errorText}>{errors.name}</p>
                )}
              </div>

              <div className={css.control}>
                <input
                  className={clsx(
                    css.input,
                    errors.email && touched.email && css.inputError
                  )}
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required
                />
                {touched.email && errors.email && (
                  <p className={css.errorText}>{errors.email}</p>
                )}
              </div>

              <div className={css.control}>
                <div
                  className={css.dateWrap}
                  onClick={() => dateRef.current?.showPicker?.()}
                >
                  {!formData.date && !isDateFocused && (
                    <span className={css.datePlaceholder}>Booking date*</span>
                  )}

                  <input
                    ref={dateRef}
                    className={clsx(
                      css.input,
                      css.dateInput,
                      errors.date && touched.date && css.inputError
                    )}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onFocus={() => setIsDateFocused(true)}
                    onBlur={() => setIsDateFocused(false)}
                    min={minDate}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                {touched.date && errors.date && (
                  <p className={css.errorText}>{errors.date}</p>
                )}
              </div>

              <textarea
                className={css.textarea}
                name="comment"
                placeholder="Comment"
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <button className={css.submit} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Send"}
              </button>

              {notice && (
                <div
                  className={clsx(
                    css.notice,
                    notice.type === "success"
                      ? css.noticeSuccess
                      : css.noticeError
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {notice.text}
                </div>
              )}
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;

