import { useEffect, useId, useRef, useState } from 'react';
import { Check, CheckCircle2, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { asset, ChapterMark, AuraWords, useInViewOnce } from './primitives';

const FORMSPREE_URL = 'https://formspree.io/f/xojednlb';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const infoIcons = { email: Mail, phone: Phone, location: MapPin };
const EMPTY = { name: '', email: '', phone: '', message: '', interests: [], privacy: false };
const FIELD_ORDER = ['name', 'email', 'message', 'privacy'];

function validate(v, errors) {
  const e = {};
  if (!v.name.trim()) e.name = errors.name;
  if (!EMAIL_RE.test(v.email.trim())) e.email = errors.email;
  if (!v.message.trim()) e.message = errors.message;
  if (!v.privacy) e.privacy = errors.privacy;
  return e;
}

function Field({ id, label, error, multiline = false, inputRef, ...props }) {
  const Tag = multiline ? 'textarea' : 'input';
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <Tag
        id={id}
        ref={inputRef}
        className="field-input"
        placeholder=" "
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <label htmlFor={id} className="field-label">
        {label}
        {props.required && (
          <span aria-hidden="true" className="text-volt">
            {' '}
            *
          </span>
        )}
      </label>
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact({ copy, lang, onOpenLegal }) {
  const f = copy.form;
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null), privacy: useRef(null) };
  const successRef = useRef(null);
  const [headRef, shown] = useInViewOnce();

  // After the first submit, errors clear as soon as a field becomes valid
  useEffect(() => {
    if (attempted) setErrors(validate(values, f.errors));
  }, [values, attempted, f.errors]);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (item) =>
    setValues((prev) => ({
      ...prev,
      interests: prev.interests.includes(item) ? prev.interests.filter((x) => x !== item) : [...prev.interests, item],
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(values, f.errors);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          interests: values.interests.join(', '),
          message: values.message.trim(),
          privacy: true,
          language: lang,
        }),
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setStatus('sent');
      setValues(EMPTY);
      setAttempted(false);
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section id="contact" className="chapter contact" aria-labelledby="contact-title">
      <div className="contact-aura" aria-hidden="true">
        <img src={asset('/media/aura-field.webp')} alt="" width="1600" height="900" loading="lazy" decoding="async" />
      </div>

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div ref={headRef} className="lg:col-span-5">
          <div className="reveal" data-shown={shown}>
            <ChapterMark index={copy.index} label={copy.label} />
          </div>
          <h2 id="contact-title" className="reveal type-h2 mt-5 text-hi" data-shown={shown} style={{ '--d': '90ms' }}>
            {copy.title} <AuraWords text={copy.titleAccent} />
          </h2>
          <p className="reveal type-lead mt-5 max-w-measure" data-shown={shown} style={{ '--d': '160ms' }}>
            {copy.lead}
          </p>

          <ul className="mt-10 border-t border-line">
            {copy.info.map((item) => {
              const Icon = infoIcons[item.key];
              const body = (
                <>
                  <span className="icon-tile">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-lo">{item.label}</span>
                    <span className="block text-base font-medium text-hi">{item.value}</span>
                  </span>
                </>
              );
              return (
                <li key={item.key} className="border-b border-line">
                  {item.href ? (
                    <a href={item.href} className="contact-row">
                      {body}
                    </a>
                  ) : (
                    <div className="contact-row">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {copy.trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-mid">
                <Check className="h-4 w-4 text-volt" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="surface-panel contact-card">
            {status === 'sent' ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
                <span className="success-mark">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 ref={successRef} tabIndex={-1} className="type-h3 mt-6 text-hi outline-none">
                  {f.successTitle}
                </h3>
                <p className="mt-3 text-base text-lo">{f.successText}</p>
                <button type="button" className="btn btn-ghost mt-8" onClick={() => setStatus('idle')}>
                  {f.again}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-describedby={status === 'error' ? `${uid}-net` : undefined}>
                <h3 className="type-h3 text-hi">{f.title}</h3>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field
                    id={`${uid}-name`}
                    label={f.name}
                    name="name"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={set('name')}
                    error={errors.name}
                    inputRef={refs.name}
                  />
                  <Field
                    id={`${uid}-email`}
                    label={f.email}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={set('email')}
                    error={errors.email}
                    inputRef={refs.email}
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id={`${uid}-phone`}
                      label={f.phone}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={set('phone')}
                    />
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="text-sm text-lo">{f.interestsLabel}</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.interests.map((item) => {
                      const on = values.interests.includes(item);
                      return (
                        <button key={item} type="button" className="chip" aria-pressed={on} onClick={() => toggleInterest(item)}>
                          {on && <Check className="h-3.5 w-3.5 text-volt" aria-hidden="true" />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <Field
                    id={`${uid}-message`}
                    label={f.message}
                    name="message"
                    multiline
                    rows={5}
                    required
                    value={values.message}
                    onChange={set('message')}
                    error={errors.message}
                    inputRef={refs.message}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-start gap-3">
                    <input
                      ref={refs.privacy}
                      id={`${uid}-privacy`}
                      type="checkbox"
                      className="check"
                      checked={values.privacy}
                      onChange={set('privacy')}
                      required
                      aria-labelledby={`${uid}-privacy-text`}
                      aria-invalid={errors.privacy ? 'true' : undefined}
                      aria-describedby={errors.privacy ? `${uid}-privacy-error` : undefined}
                    />
                    <p id={`${uid}-privacy-text`} className="text-sm leading-5 text-lo">
                      <label htmlFor={`${uid}-privacy`} className="cursor-pointer">
                        {f.privacyPrefix}
                      </label>{' '}
                      <button type="button" className="text-link" onClick={() => onOpenLegal('privacy')}>
                        {f.privacyLink}
                      </button>{' '}
                      {f.privacyMiddle}{' '}
                      <button type="button" className="text-link" onClick={() => onOpenLegal('aszf')}>
                        {f.termsLink}
                      </button>
                      {f.privacySuffix}
                    </p>
                  </div>
                  {errors.privacy && (
                    <p id={`${uid}-privacy-error`} className="field-error pl-8">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p id={`${uid}-net`} role="alert" className="mt-6 rounded-ctl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-hi">
                    {f.errors.network}{' '}
                    <a href="mailto:info@auracode.hu" className="text-link">
                      info@auracode.hu
                    </a>
                  </p>
                )}

                <button type="submit" className="btn btn-volt mt-8 w-full" disabled={sending}>
                  {sending ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {f.sending}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
