export function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-4 bg-footer px-page-x py-section-y-lg text-center sm:gap-6">
      <h2 className="font-serif text-campaign-title text-ink">Subscribe to our Newsletter</h2>
      <p className="font-futura max-w-[400px] text-body-sm text-ink/55">
        Receive new collections and stories from the Peruvian highlands.
      </p>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full max-w-[440px] flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border border-ink/20 bg-white px-4 py-3 text-body-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-ink px-8 py-btn-y text-btn font-normal uppercase text-white"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
