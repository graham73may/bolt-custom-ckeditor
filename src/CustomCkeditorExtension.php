<?php

namespace Bolt\Extension\Soapbox\CustomCkeditor;

use Bolt\Asset\File\JavaScript;
use Bolt\Extension\SimpleExtension;
use Bolt\Controller\Zone;

/**
 * CustomCkeditor extension class.
 *
 * @author Graham May <graham.may@soapbox.co.uk>
 */
class CustomCkeditorExtension extends SimpleExtension
{

    /**
     * {@inheritdoc}
     */
    protected function registerAssets()
    {

        $asset = new JavaScript();
        $asset->setFileName('replace-ckeditor.js')
              ->setZone(Zone::BACKEND)
              ->setLate(true);

        return [
            $asset,
        ];
    }
}
