'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'

export default function FollowType({ subCount }) {

  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (name === "type" && value === "following") {
        params.delete("page");
        router.push(`${pathname}/?${params?.toString()}`);
      } else if (name === 'type' && value === 'all') {
        params.delete("page");
        params.delete("type");
        router.push(`${pathname}/?${params?.toString()}`);
      }
    },
    [pathname, router, searchParams]
  );

  const followType = searchParams.get("type") || 'all';

  return (
    <div className="row g-3">
      <div className="col-lg-12">
        <div className="form-group d-flex flex-column align-items-start">
          <div
            className="form-switch-group d-flex align-items-center justify-content-start"
            id="travellingYear"
          >
            <div className="form-check custom-radio-3 d-flex align-items-center">
              <input
                checked={followType === "all"}
                className="form-check-input"
                type="radio"
                name="travel_year"
                id="travellingYear1"
                onChange={() => createQueryString('type', 'all')}
              />
              <label
                className="form-check-label p-0"
                htmlFor="travellingYear1"
              >
                All
              </label>
            </div>
            <div className="form-check custom-radio-3 d-flex align-items-center">
              <input
                checked={followType === "following"}
                className="form-check-input"
                type="radio"
                name="travel_year"
                id="travellingYear2"
                onChange={() => createQueryString('type', 'following')}
              />
              <label
                className="form-check-label p-0"
                htmlFor="travellingYear2"
              >
                Following ({subCount})
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
