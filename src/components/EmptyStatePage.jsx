import { useState } from 'react';
import { Page, Layout, EmptyState } from '@shopify/polaris';
import { TitleBar, ResourcePicker } from '@shopify/app-bridge-react';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

export const EmptyStatePage = ({ setSelection }) => {
  const [open, setOpen] = useState(false);
  const handleSelection = (resources) => {
    setOpen(false);
    setSelection(resources.selection.map((product) => product.id));
  };

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: 'Select a product',
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType='Product'
        showVariants={false}
        open={open}
        onSelection={handleSelection}
        onCancel={() => setOpen(false)}
      />
      <Layout>
        <Layout.Section>
          <EmptyState
            heading='Discount your products temporarily'
            action={{
              content: 'Select products',
              onAction: () => setOpen(true),
            }}
            image={img}
            imageContained
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
