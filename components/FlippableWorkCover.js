"use client";

export default function FlippableWorkCover({ item, children, flipped = false }) {
  const coverImageWidth = item.coverImageWidth || 440;
  const coverImageHeight = item.coverImageHeight || 440;

  if (!item?.coverImage) return null;

  return (
    <div
      className={`cv-work-card-cover cv-work-card-cover--flip${flipped ? " is-flipped" : ""}`}
      tabIndex={0}
    >
      <div className="cv-work-card-cover-flip">
        <div
          className="cv-work-card-cover-face cv-work-card-cover-front"
          style={item.coverBackgroundColor ? { backgroundColor: item.coverBackgroundColor } : undefined}
        >
          <img
            className={`cv-work-card-cover-img${item.coverImageClassName ? ` ${item.coverImageClassName}` : ""}`}
            src={item.coverImage}
            alt={item.coverAlt || ""}
            loading="lazy"
            decoding="async"
            width={coverImageWidth}
            height={coverImageHeight}
          />
        </div>

        <div className="cv-work-card-cover-face cv-work-card-cover-back">
          {children}
        </div>
      </div>
    </div>
  );
}
