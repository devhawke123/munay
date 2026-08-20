export function Newsletter() {
  return (
    <div className="flex flex-col items-center gap-4 bg-gold-deep/[0.06] px-4 py-16 text-center sm:gap-6 sm:py-24">
      <h2 className="font-serif text-2xl text-ink sm:text-4xl">Subscribe to our Newsletter</h2>
      <p className="max-w-[400px] text-sm text-ink/55">
        Receive new collections and stories from the Peruvian highlands.
      </p>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full max-w-[440px] flex-col gap-3 sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-ink px-8 py-3 text-xs uppercase tracking-[1.4px] text-white"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
