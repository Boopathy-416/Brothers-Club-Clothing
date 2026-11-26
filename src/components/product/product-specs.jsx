import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'

export function ProductSpecs({ product }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={['details']}
      className="border-t border-border"
    >
      <AccordionItem value="details">
        <AccordionTrigger className="text-xs font-semibold tracking-[0.16em] uppercase">
          Product details
        </AccordionTrigger>

        <AccordionContent>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="wholesale">
        <AccordionTrigger className="text-xs font-semibold tracking-[0.16em] uppercase">
          Wholesale terms
        </AccordionTrigger>

        <AccordionContent className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            Minimum order quantity is {product.moq} pieces per style, mixed across colours and sizes.
          </p>

          <p>
            Pricing is shared on quotation after our sales team reviews your enquiry. No online payment is taken.
          </p>

          <p>
            Dispatched from Tiruppur, Tamil Nadu, with pan-India transport partners.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size">
        <AccordionTrigger className="text-xs font-semibold tracking-[0.16em] uppercase">
          Size guide
        </AccordionTrigger>

        <AccordionContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Waist size guide in inches
              </caption>

              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th scope="col" className="py-2 pr-4 font-semibold">
                    Size
                  </th>

                  {product.sizes.map((s) => (
                    <th
                      key={s}
                      scope="col"
                      className="py-2 pr-4 font-semibold"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="py-2 pr-4 text-xs font-semibold text-muted-foreground"
                  >
                    Waist (in)
                  </th>

                  {product.sizes.map((s, i) => (
                    <td key={s} className="py-2 pr-4 tabular-nums">
                      {28 +
                        (i +
                          [
                            'S',
                            'M',
                            'L',
                            'XL',
                            '2XL',
                            '3XL',
                            '4XL',
                            '5XL',
                            '6XL',
                          ].indexOf(product.sizes[0])) *
                          2}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}